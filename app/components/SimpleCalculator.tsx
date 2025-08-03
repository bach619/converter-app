"use client";

import { useState, useEffect } from 'react';

export default function SimpleCalculator() {
  const [input, setInput] = useState('0');
  const [previousInput, setPreviousInput] = useState('');
  const [operator, setOperator] = useState('');
  const [shouldReset, setShouldReset] = useState(false);

  const handleNumberClick = (number: string) => {
    if (input === '0' || shouldReset) {
      setInput(number);
      setShouldReset(false);
    } else {
      setInput(input + number);
    }
  };

  const handleOperatorClick = (op: string) => {
    setPreviousInput(input);
    setOperator(op);
    setShouldReset(true);
  };

  const handleEquals = async () => {
    if (!operator) return;

    // Convert UI operator to backend operator
    const backendOperator = operator === '×' ? '*' : operator === '÷' ? '/' : operator;

    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          num1: parseFloat(previousInput),
          num2: parseFloat(input),
          operator: backendOperator
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Calculation failed');
      }

      const data = await response.json();
      setInput(data.result.toString());
      setOperator('');
      setShouldReset(true);
    } catch (error) {
      console.error('Error:', error);
      setInput('Error');
      setOperator('');
      setShouldReset(true);
    }
  };

  const handleClear = () => {
    setInput('0');
    setPreviousInput('');
    setOperator('');
  };

  const handleDecimal = () => {
    if (shouldReset) {
      setInput('0.');
      setShouldReset(false);
      return;
    }

    if (!input.includes('.')) {
      setInput(input + '.');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleNumberClick(e.key);
      } else if (e.key === '.') {
        handleDecimal();
      } else if (e.key === 'Enter' || e.key === '=') {
        handleEquals();
      } else if (e.key === 'Escape') {
        handleClear();
      } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        let op = e.key;
        if (op === '*') op = '×';
        if (op === '/') op = '÷';
        handleOperatorClick(op);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gray-100 rounded-lg p-4 mb-4">
        <div className="text-right text-3xl font-mono overflow-x-auto">
          {input}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[7, 8, 9, '+'].map((item) => (
          <button
            key={item}
            className="bg-white rounded-lg p-3 text-lg font-medium shadow hover:bg-gray-50 active:bg-gray-100"
            onClick={() => 
              typeof item === 'number' 
                ? handleNumberClick(item.toString()) 
                : handleOperatorClick(item)
            }
          >
            {item}
          </button>
        ))}

        {[4, 5, 6, '-'].map((item) => (
          <button
            key={item}
            className="bg-white rounded-lg p-3 text-lg font-medium shadow hover:bg-gray-50 active:bg-gray-100"
            onClick={() => 
              typeof item === 'number' 
                ? handleNumberClick(item.toString()) 
                : handleOperatorClick(item)
            }
          >
            {item}
          </button>
        ))}

        {[1, 2, 3, '×'].map((item) => (
          <button
            key={item}
            className="bg-white rounded-lg p-3 text-lg font-medium shadow hover:bg-gray-50 active:bg-gray-100"
            onClick={() => 
              typeof item === 'number' 
                ? handleNumberClick(item.toString()) 
                : handleOperatorClick(item)
            }
          >
            {item}
          </button>
        ))}

        <button
          className="bg-white rounded-lg p-3 text-lg font-medium shadow hover:bg-gray-50 active:bg-gray-100 col-span-2"
          onClick={() => handleNumberClick('0')}
        >
          0
        </button>
        
        <button
          className="bg-white rounded-lg p-3 text-lg font-medium shadow hover:bg-gray-50 active:bg-gray-100"
          onClick={handleDecimal}
        >
          .
        </button>
        
        <button
          className="bg-white rounded-lg p-3 text-lg font-medium shadow hover:bg-gray-50 active:bg-gray-100"
          onClick={() => handleOperatorClick('÷')}
        >
          ÷
        </button>

        <button
          className="bg-blue-500 text-white rounded-lg p-3 text-lg font-medium shadow hover:bg-blue-600 active:bg-blue-700 col-span-2"
          onClick={handleEquals}
        >
          =
        </button>
        
        <button
          className="bg-red-500 text-white rounded-lg p-3 text-lg font-medium shadow hover:bg-red-600 active:bg-red-700 col-span-2"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
