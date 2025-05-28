import { useState, useEffect } from 'react';

// Dummy data matching your PDF
const dummyData = [
  "react tutorial",
  "react hooks examples", 
  "react native vs flutter",
  "react performance optimization",
  "react state management",
  "react router dom",
  "react query tutorial",
  "react typescript guide",
  "react best practices",
  "React Query",
  "React Hooks",
  "React Router",
  "React Redux",
  "JavaScript Basics",
  "TypeScript Advanced",
  "Node.js Fundamentals",
  "Python Programming",
  "Vue.js Guide"
];

// Simple cache
const cache = new Map();
const MAX_CACHE_SIZE = 10;

function App() {
  const [inputValue, setInputValue] = useState('react');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  // Initialize with "react" search like in your PDF
  useEffect(() => {
    const filtered = dummyData.filter(item =>
      item.toLowerCase().includes('react')
    );
    setSuggestions(filtered);
    setIsOpen(true);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue.trim()) {
        // Check cache
        if (cache.has(inputValue.toLowerCase())) {
          const cached = cache.get(inputValue.toLowerCase());
          setSuggestions(cached);
          setIsOpen(cached.length > 0);
          return;
        }

        // Filter data
        const filtered = dummyData.filter(item =>
          item.toLowerCase().includes(inputValue.toLowerCase())
        );
        
        // Cache management
        if (cache.size >= MAX_CACHE_SIZE) {
          const firstKey = cache.keys().next().value;
          cache.delete(firstKey);
        }
        cache.set(inputValue.toLowerCase(), filtered);
        
        setSuggestions(filtered);
        setIsOpen(filtered.length > 0);
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const highlightMatch = (text) => {
    if (!inputValue.trim()) return text;
    const regex = new RegExp(`(${inputValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      if (part.toLowerCase() === inputValue.toLowerCase()) {
        return <strong key={index}>{part}</strong>;
      }
      return part;
    });
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setIsOpen(false);
  };

  const handleClear = () => {
    setInputValue('');
    setSuggestions([]);
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: 'white',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '120px',
      fontFamily: 'arial, sans-serif',
      overflow: 'hidden'
    }}>
      {/* SearchPro Header */}
      <h1 style={{
        fontSize: '90px',
        fontWeight: 'normal',
        color: '#4285f4',
        marginBottom: '35px',
        letterSpacing: '-3px',
        margin: '0 0 35px 0'
      }}>
        SearchPro
      </h1>

      {/* Search Container */}
      <div style={{ 
        position: 'relative', 
        width: '584px',
        zIndex: 1000
      }}>
        {/* Main Search Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
          border: '1px solid #dfe1e5',
          borderRadius: '24px',
          height: '44px',
          paddingLeft: '14px',
          paddingRight: '14px',
          boxShadow: '0 2px 5px 1px rgba(64,60,67,.16)',
          position: 'relative'
        }}>
          {/* Search Icon */}
          <svg style={{ 
            width: '20px', 
            height: '20px', 
            marginRight: '13px',
            color: '#9aa0a6'
          }}>
            <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>

          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            style={{
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              width: '100%',
              height: '34px',
              backgroundColor: 'transparent',
              color: '#202124'
            }}
            autoComplete="off"
          />

          {/* Clear X Button */}
          {inputValue && (
            <button
              onClick={handleClear}
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                padding: '8px',
                marginLeft: '8px',
                color: '#70757a',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="24" height="24">
                <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          )}
        </div>

        {/* Suggestions Dropdown - Exactly like PDF */}
        {isOpen && suggestions.length > 0 && (
          <div style={{
            position: 'absolute',
            top: '44px',
            left: '0',
            right: '0',
            backgroundColor: 'white',
            border: '1px solid #d9d9d9',
            borderTop: 'none',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
            boxShadow: '0 4px 6px rgba(32,33,36,.28)',
            zIndex: 1001,
            maxHeight: '294px',
            overflowY: 'auto'
          }}>
            {suggestions.slice(0, 10).map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                style={{
                  padding: '0 16px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  borderBottom: index < suggestions.length - 1 ? '1px solid #e8eaed' : 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                {/* Small Search Icon */}
                <svg style={{ 
                  width: '16px', 
                  height: '16px', 
                  marginRight: '16px',
                  color: '#70757a',
                  flexShrink: 0
                }}>
                  <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                
                {/* Suggestion Text in Blue */}
                <span style={{
                  fontSize: '16px',
                  color: '#1a0dab',
                  textDecoration: 'none'
                }}>
                  {highlightMatch(suggestion)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;