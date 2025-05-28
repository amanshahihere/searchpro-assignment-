import { useState, useRef } from 'react';
import debounce from 'lodash.debounce';
import LRUCache from 'lru-cache';

// Dummy data
const dummyData = [
  "React Tutorials",
  "React Query",
  "React Redux",
  "JavaScript Basics",
  "TypeScript Advanced",
  "Node.js Fundamentals",
  "Python Programming",
  "Vue.js Guide"
];

const cache = new LRUCache({ max: 10 });

const Autocomplete = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  const filterSuggestions = (value) => {
    if (cache.has(value)) {
      return cache.get(value);
    }

    const filtered = dummyData.filter(item =>
      item.toLowerCase().includes(value.toLowerCase())
    );

    cache.set(value, filtered);
    return filtered;
  };

  const handleInputChange = debounce((value) => {
    const results = value ? filterSuggestions(value) : [];
    setSuggestions(results);
  }, 300);

  const highlightMatch = (text) => {
    if (!inputValue) return text;
    const parts = text.split(new RegExp(`(${inputValue})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === inputValue.toLowerCase() ?
        <strong key={index}>{part}</strong> : part
    );
  };

  return (
    <div className="autocomplete-wrapper">
      <input
        ref={inputRef}
        placeholder="Search..."
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          handleInputChange(e.target.value);
        }}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((item, index) => (
            <li key={index} onClick={() => setInputValue(item)}>
              {highlightMatch(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;