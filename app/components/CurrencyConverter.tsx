"use client";

import { useState, useEffect } from 'react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('IDR');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  // Supported currencies
  const popularCurrencies = [
    'USD', 'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG',
    'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB',
    'BRL', 'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP',
    'CNY', 'COP', 'CRC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD',
    'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'FOK', 'GBP', 'GEL', 'GGP',
    'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG',
    'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD',
    'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KID', 'KMF', 'KRW', 'KWD', 'KYD',
    'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA',
    'MKD', 'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR',
    'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN',
    'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF',
    'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLE', 'SLL', 'SOS',
    'SRD', 'SSP', 'STN', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP',
    'TRY', 'TTD', 'TVD', 'TWD', 'TZS', 'UAH', 'UGX', 'UYU', 'UZS', 'VES',
    'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XCG', 'XDR', 'XOF', 'XPF', 'YER',
    'ZAR', 'ZMW', 'ZWL'
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

  const fetchExchangeRate = async (retryCount = 0) => {
    if (fromCurrency && toCurrency) {
      setLoading(true);
      
      // Set timeout to 5 seconds
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/9c983e5711b0cd0d8566762a/latest/${fromCurrency}`,
          { signal: controller.signal }
        );
        
        const data = await response.json();
        
        if (data.result === 'success') {
          const rate = data.conversion_rates[toCurrency];
          if (rate) {
            setExchangeRate(rate);
            setLastUpdated(new Date().toLocaleTimeString());
            if (amount > 0) {
              setConvertedAmount(parseFloat((amount * rate).toFixed(2)));
            }
          } else {
            throw new Error(`Currency ${toCurrency} not supported`);
          }
        } else {
          throw new Error(data['error-type'] || 'Failed to get exchange rate');
        }
      } catch (error) {
        // Implement exponential backoff for retries (max 3 retries)
        if (retryCount < 3) {
          setTimeout(() => fetchExchangeRate(retryCount + 1), 1000 * Math.pow(2, retryCount));
          return;
        }
        
        console.error('Failed to get exchange rates:', error);
      } finally {
        clearTimeout(timeoutId);
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
      <h2 className="text-2xl font-semibold mb-4">Currency Converter</h2>
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
          
          {lastUpdated && !loading && (
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
