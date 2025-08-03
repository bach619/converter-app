"use client";

import { useState } from 'react';
import CurrencyConverter from './components/CurrencyConverter';
import UnitConverter from './components/UnitConverter';
import TimeConverter from './components/TimeConverter';
import SimpleCalculator from './components/SimpleCalculator';
import Wheel from './components/Wheel';
import NameInput from './components/NameInput';
import WinnerDisplay from './components/WinnerDisplay';

export default function Home() {
  const [activeTab, setActiveTab] = useState('currency');
  const [names, setNames] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);

  const handleAddName = (name: string) => {
    setNames([...names, name]);
  };

  const handleSelectWinner = (winner: string) => {
    setWinner(winner);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Free Online Converter Tools - Currency, Units, Time & Calculators
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Fast, accurate conversions for currencies, units, time zones, and calculations. No installation required!
          </p>
        </header>

        <section className="mb-8 text-center">
          <p className="text-lg text-gray-700">
            Convert between 180+ currencies with real-time exchange rates, 
            calculate measurements across different unit systems, compare time zones worldwide, 
            and perform simple calculations. All tools are 100% free!
          </p>
        </section>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'currency'
                  ? 'bg-white shadow text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('currency')}
            >
              Currency
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'unit'
                  ? 'bg-white shadow text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('unit')}
            >
              Unit
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'time'
                  ? 'bg-white shadow text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('time')}
            >
              Time
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'simple-calc'
                  ? 'bg-white shadow text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('simple-calc')}
            >
              Simple Calc
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'wheel'
                  ? 'bg-white shadow text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('wheel')}
            >
              Wheel of Names
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-md p-6">
          {activeTab === 'currency' && <CurrencyConverter />}
          {activeTab === 'unit' && <UnitConverter />}
          {activeTab === 'time' && <TimeConverter />}
          {activeTab === 'simple-calc' && <SimpleCalculator />}
        {activeTab === 'wheel' && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Wheel of Names</h2>
            <NameInput onAddName={handleAddName} />
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Wheel Section */}
              <div className="flex flex-col items-center flex-1">
                <Wheel names={names} onSelectWinner={handleSelectWinner} />
                <div className="mt-4">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                    onClick={() => setNames([])}
                  >
                    Reset Names
                  </button>
                </div>
              </div>
              
              {/* Contestants List */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Contestants</h3>
                <div className="bg-gray-100 p-4 rounded-lg max-h-60 overflow-y-auto">
                  {names.length === 0 ? (
                    <p className="text-gray-500">No contestants added yet</p>
                  ) : (
                    <ul className="space-y-2">
                      {names.map((name, index) => (
                        <li 
                          key={index} 
                          className="p-2 bg-white rounded shadow-sm flex justify-between items-center"
                        >
                          <span>{name}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            
            <WinnerDisplay winner={winner} />
          </div>
        )}
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <div className="mb-4">
            <a href="/about" className="mx-2 hover:underline">About</a>
            <a href="/privacy" className="mx-2 hover:underline">Privacy Policy</a>
            <a href="/terms" className="mx-2 hover:underline">Terms of Service</a>
            <a href="/contact" className="mx-2 hover:underline">Contact</a>
          </div>
          <p>© {new Date().getFullYear()} Free Converter Tools. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
