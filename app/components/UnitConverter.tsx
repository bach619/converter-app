"use client";

import { useState, useEffect } from 'react';

// Tipe data untuk unit konversi
type Unit = {
  name: string;
  symbol: string;
  factor?: number;
};

// Definisi unit dan faktor konversi
const unitConversions: Record<string, Unit[]> = {
  length: [
    { name: 'kilometer', symbol: 'km', factor: 1000 },
    { name: 'meter', symbol: 'm', factor: 1 },
    { name: 'centimeter', symbol: 'cm', factor: 0.01 },
    { name: 'millimeter', symbol: 'mm', factor: 0.001 },
    { name: 'mile', symbol: 'mi', factor: 1609.344 },
    { name: 'yard', symbol: 'yd', factor: 0.9144 },
    { name: 'feet', symbol: 'ft', factor: 0.3048 },
    { name: 'inch', symbol: 'in', factor: 0.0254 },
  ],
  weight: [
    { name: 'metric ton', symbol: 't', factor: 1000 },
    { name: 'kilogram', symbol: 'kg', factor: 1 },
    { name: 'gram', symbol: 'g', factor: 0.001 },
    { name: 'milligram', symbol: 'mg', factor: 0.000001 },
    { name: 'pound', symbol: 'lb', factor: 0.453592 },
    { name: 'ounce', symbol: 'oz', factor: 0.0283495 },
    { name: 'stone', symbol: 'st', factor: 6.35029 },
  ],
  temperature: [
    { name: 'celsius', symbol: '°C' },
    { name: 'fahrenheit', symbol: '°F' },
    { name: 'kelvin', symbol: 'K' },
  ],
};

const UnitConverter = () => {
  const [category, setCategory] = useState('length');
  const [inputValue, setInputValue] = useState(1);
  const [outputValue, setOutputValue] = useState(0);
  const [inputUnit, setInputUnit] = useState(unitConversions.length[0].symbol);
  const [outputUnit, setOutputUnit] = useState(unitConversions.length[1].symbol);
  const [units, setUnits] = useState<Unit[]>(unitConversions.length);

  // Update units saat kategori berubah
  useEffect(() => {
    const newUnits = unitConversions[category as keyof typeof unitConversions];
    setUnits(newUnits);
    setInputUnit(newUnits[0].symbol);
    setOutputUnit(newUnits[1].symbol);
  }, [category]);

  // Hitung konversi saat input atau unit berubah
  useEffect(() => {
    if (category === 'temperature') {
      // Konversi suhu
      let celsiusValue;
      
      // Konversi ke Celcius dulu
      if (inputUnit === '°C') {
        celsiusValue = inputValue;
      } else if (inputUnit === '°F') {
        celsiusValue = (inputValue - 32) * 5/9;
      } else { // Kelvin
        celsiusValue = inputValue - 273.15;
      }

      // Konversi dari Celcius ke unit tujuan
      if (outputUnit === '°C') {
        setOutputValue(celsiusValue);
      } else if (outputUnit === '°F') {
        setOutputValue((celsiusValue * 9/5) + 32);
      } else { // Kelvin
        setOutputValue(celsiusValue + 273.15);
      }
    } else {
      // Konversi panjang dan berat
      const inputUnitData = units.find(unit => unit.symbol === inputUnit);
      const outputUnitData = units.find(unit => unit.symbol === outputUnit);
      
      if (inputUnitData && outputUnitData && inputUnitData.factor && outputUnitData.factor) {
        // Konversi ke nilai dasar (misal: meter untuk panjang, kg untuk berat)
        const baseValue = inputValue * inputUnitData.factor;
        // Konversi dari nilai dasar ke unit tujuan
        const result = baseValue / outputUnitData.factor;
        setOutputValue(result);
      }
    }
  }, [inputValue, inputUnit, outputUnit, category, units]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseFloat(e.target.value) || 0);
  };

  const handleOutputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOutputValue(parseFloat(e.target.value) || 0);
  };

  const swapUnits = () => {
    setInputUnit(outputUnit);
    setOutputUnit(inputUnit);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Unit Converter</h2>
      
      <div className="mb-4">
        <label className="block mb-2">Category</label>
        <select 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded text-lg"
        >
          <option value="length">Length</option>
          <option value="weight">Weight</option>
          <option value="temperature">Temperature</option>
        </select>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
          <select
            value={inputUnit}
            onChange={(e) => setInputUnit(e.target.value)}
            className="border p-2 rounded"
          >
            {units.map(unit => (
              <option key={unit.symbol} value={unit.symbol}>
                {unit.symbol} ({unit.name})
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={swapUnits}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            🔄 Swap
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={outputValue}
            onChange={handleOutputChange}
            className="border p-2 rounded w-full"
          />
          <select
            value={outputUnit}
            onChange={(e) => setOutputUnit(e.target.value)}
            className="border p-2 rounded"
          >
            {units.map(unit => (
              <option key={unit.symbol} value={unit.symbol}>
                {unit.symbol} ({unit.name})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
