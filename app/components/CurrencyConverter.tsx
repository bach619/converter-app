"use client";

import { useState, useEffect } from 'react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('IDR');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  // Supported currencies
  const popularCurrencies = [
    'USD', 'IDR', 'EUR', 'GBP', 'JPY', 'SGD',
    'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'INR',
    'MXN', 'MYR', 'NZD', 'RUB', 'THB', 'VND'
  ];

  useEffect(() => {
    // Mengambil daftar mata uang dari API
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('https://api.exchangerate.host/symbols');
        const data = await response.json();
        if (data.success) {
          setCurrencies(Object.keys(data.symbols));
        }
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, []);

  const fetchExchangeRate = async () => {
    if (fromCurrency && toCurrency) {
      setError(null);
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}`
        );
        const data = await response.json();
        
        if (data.success) {
          setExchangeRate(data.result);
          setLastUpdated(new Date().toLocaleTimeString());
          // Update converted amount when rate changes
          if (amount > 0) {
            setConvertedAmount(parseFloat((amount * data.result).toFixed(2)));
          }
        } else {
          setError('Failed to get exchange rate. Please try again.');
        }
      } catch (error) {
        setError('Network error. Please check your connection.');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // Only fetch if currencies are valid
    if (fromCurrency && toCurrency && fromCurrency !== toCurrency) {
      fetchExchangeRate();
    }
  }, [fromCurrency, toCurrency]);

  const handleSwap = () => {
    // Simply swap currencies - conversion will happen automatically
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setAmount(value);
    if (exchangeRate) {
      setConvertedAmount(parseFloat((value * exchangeRate).toFixed(2)));
    }
  };
  
  const handleConvertedAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setConvertedAmount(value);
    if (exchangeRate) {
      setAmount(parseFloat((value / exchangeRate).toFixed(2)));
    }
  };
  
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Currency Converter</h2>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="border p-2 rounded w-full"
            min="0"
          />
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="border p-2 rounded"
          >
            {currencies.length > 0 ? (
              currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))
            ) : (
              <>
                {popularCurrencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={handleSwap}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            🔄 Swap
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={formatNumber(convertedAmount)}
            onChange={handleConvertedAmountChange}
            className="border p-2 rounded w-full"
          />
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="border p-2 rounded"
          >
            {currencies.length > 0 ? (
              currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))
            ) : (
              <>
                {popularCurrencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          {loading && (
            <div className="text-blue-500 text-sm">
              Updating exchange rates...
            </div>
          )}
          
          {error && (
            <div className="text-red-500 text-sm">
              {error}
              <button 
                onClick={fetchExchangeRate} 
                className="ml-2 text-blue-500 underline"
              >
                Retry
              </button>
            </div>
          )}
          
          {lastUpdated && !loading && !error && (
            <div className="text-gray-500 text-sm">
              Rate updated at: {lastUpdated}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
