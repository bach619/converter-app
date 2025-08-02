"use client";

import { useState } from 'react';
import CurrencyConverter from './components/CurrencyConverter';
import UnitConverter from './components/UnitConverter';
import TimeConverter from './components/TimeConverter';

export default function Home() {
  const [activeTab, setActiveTab] = useState('currency');

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Unit & Currency Converter
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Konversi mata uang, satuan, dan waktu secara real-time
          </p>
        </header>

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
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-md p-6">
          {activeTab === 'currency' && <CurrencyConverter />}
          {activeTab === 'unit' && <UnitConverter />}
          {activeTab === 'time' && <TimeConverter />}
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Converter App. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
