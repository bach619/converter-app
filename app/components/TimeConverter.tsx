"use client";

import { useState, useEffect } from 'react';

const TimeConverter = () => {
  const [activeTab, setActiveTab] = useState('timezone');
  const [timezones, setTimezones] = useState<string[]>([]);
  const [fromTimezone, setFromTimezone] = useState('Asia/Jakarta');
  const [toTimezone, setToTimezone] = useState('UTC');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Format waktu
  const [time24, setTime24] = useState('12:00');
  const [time12, setTime12] = useState('12:00 PM');
  const [isAM, setIsAM] = useState(false);

  // Ambil daftar timezone saat komponen dimuat
  useEffect(() => {
    const fetchTimezones = async () => {
      try {
        const response = await fetch('http://worldtimeapi.org/api/timezone');
        const data = await response.json();
        setTimezones(data);
      } catch (error) {
        console.error('Error fetching timezones:', error);
      }
    };

    fetchTimezones();
  }, []);

  // Konversi waktu saat zona waktu berubah
  useEffect(() => {
    const convertTimezone = async () => {
      if (!fromTimezone || !toTimezone) return;
      
      setLoading(true);
      try {
        // Ambil waktu saat ini untuk fromTimezone
        const fromResponse = await fetch(`http://worldtimeapi.org/api/timezone/${fromTimezone}`);
        const fromData = await fromResponse.json();
        const fromDateTime = new Date(fromData.datetime);
        
        // Konversi waktu ke zona waktu tujuan
        const toResponse = await fetch(`http://worldtimeapi.org/api/timezone/${toTimezone}`);
        const toData = await toResponse.json();
        const toDateTime = new Date(toData.datetime);
        
        // Hitung perbedaan waktu dalam jam
        const diffHours = (toDateTime.getTime() - fromDateTime.getTime()) / (1000 * 60 * 60);
        
        // Terapkan perbedaan ke waktu input
        if (fromTime) {
          const [hours, minutes] = fromTime.split(':').map(Number);
          const date = new Date();
          date.setHours(hours + diffHours);
          date.setMinutes(minutes);
          setToTime(`${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`);
        }
      } catch (error) {
        console.error('Error converting time:', error);
      } finally {
        setLoading(false);
      }
    };

    convertTimezone();
  }, [fromTimezone, toTimezone, fromTime]);

  // Konversi format waktu
  useEffect(() => {
    // Konversi 24 jam ke 12 jam
    const convertTo12Hour = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      const twelveHour = hours % 12 || 12;
      return `${twelveHour}:${minutes.toString().padStart(2, '0')} ${period}`;
    };

    // Konversi 12 jam ke 24 jam
    const convertTo24Hour = (time: string) => {
      const [timePart, period] = time.split(' ');
      const [hours, minutes] = timePart.split(':').map(Number);
      let hour24 = hours;
      
      if (period === 'PM' && hours < 12) hour24 = hours + 12;
      if (period === 'AM' && hours === 12) hour24 = 0;
      
      return `${hour24.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    if (activeTab === 'format') {
      setTime12(convertTo12Hour(time24));
    }
  }, [time24, activeTab]);

  const handleTime24Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime24(e.target.value);
  };

  const handleTime12Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTime12(newTime);
    
    // Konversi ke 24 jam
    const [timePart, period] = newTime.split(' ');
    const [hours, minutes] = timePart.split(':').map(Number);
    
    if (period) {
      let hour24 = hours;
      if (period === 'PM' && hours < 12) hour24 = hours + 12;
      if (period === 'AM' && hours === 12) hour24 = 0;
      setTime24(`${hour24.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
    }
  };

  const handleSwapTimezones = () => {
    setFromTimezone(toTimezone);
    setToTimezone(fromTimezone);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Time Converter</h2>
      
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'timezone' 
              ? 'border-b-2 border-blue-500 text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('timezone')}
        >
          Timezone
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'format' 
              ? 'border-b-2 border-blue-500 text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('format')}
        >
          Time Format
        </button>
      </div>
      
      {/* Timezone Converter */}
      {activeTab === 'timezone' && (
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="time"
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <select
              value={fromTimezone}
              onChange={(e) => setFromTimezone(e.target.value)}
              className="border p-2 rounded"
              disabled={loading}
            >
              {timezones.map(tz => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={handleSwapTimezones}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              disabled={loading}
            >
              🔄 Swap
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="time"
              value={toTime}
              readOnly
              className="border p-2 rounded w-full bg-gray-100"
            />
            <select
              value={toTimezone}
              onChange={(e) => setToTimezone(e.target.value)}
              className="border p-2 rounded"
              disabled={loading}
            >
              {timezones.map(tz => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>
          
          {loading && <p className="text-center">Loading time data...</p>}
        </div>
      )}
      
      {/* Time Format Converter */}
      {activeTab === 'format' && (
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="mb-1">24-hour Format</label>
            <input
              type="time"
              value={time24}
              onChange={handleTime24Change}
              className="border p-2 rounded"
            />
          </div>
          
          <div className="flex justify-center">
            <span className="text-2xl">⇅</span>
          </div>
          
          <div className="flex flex-col">
            <label className="mb-1">12-hour Format</label>
            <div className="flex items-center">
              <input
                type="text"
                value={time12}
                onChange={handleTime12Change}
                className="border p-2 rounded flex-grow"
                placeholder="HH:MM AM/PM"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeConverter;
