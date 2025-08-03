import React, { useState, useRef, useEffect } from 'react';

interface WheelProps {
  names: string[];
  onSelectWinner: (winner: string) => void;
}

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

const Wheel: React.FC<WheelProps> = ({ names, onSelectWinner }) => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const wheelRef = useRef<SVGSVGElement>(null);
  const radius = 150;
  const center = { x: 150, y: 150 };

  useEffect(() => {
    if (!spinning) return;
    
    const extraRotations = 5; // 5 full rotations before stopping
    const anglePerSlice = 360 / names.length;
    // Calculate random target rotation (in degrees)
    const randomRotation = 360 * extraRotations + Math.random() * 360;
    const targetRotation = rotation + randomRotation;
    
    setRotation(targetRotation);
    
    const timer = setTimeout(() => {
      setSpinning(false);
      
      // Calculate winning segment based on final rotation
      const normalizedRotation = targetRotation % 360;
      // Adjust for starting at -90 degrees (top position)
      const adjustedRotation = (normalizedRotation + 90) % 360;
      // Determine the winning segment index
      const winnerIndex = Math.floor(adjustedRotation / anglePerSlice) % names.length;
      
      onSelectWinner(names[winnerIndex]);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [spinning, names, onSelectWinner, rotation]);

  const handleSpin = () => {
    if (names.length < 2) return;
    setSpinning(true);
  };

  // Function to calculate slice path
  const getSlicePath = (index: number) => {
    const anglePerSlice = 360 / names.length;
    const startAngle = index * anglePerSlice - 90;
    const endAngle = (index + 1) * anglePerSlice - 90;
    
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const startX = center.x + radius * Math.cos(startRad);
    const startY = center.y + radius * Math.sin(startRad);
    const endX = center.x + radius * Math.cos(endRad);
    const endY = center.y + radius * Math.sin(endRad);
    
    const largeArc = anglePerSlice > 180 ? 1 : 0;
    
    return `M ${center.x} ${center.y} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY} Z`;
  };

  // Function to calculate text position
  const getTextPosition = (index: number) => {
    const anglePerSlice = 360 / names.length;
    const midAngle = (index * anglePerSlice + anglePerSlice / 2 - 90) * (Math.PI / 180);
    const textRadius = radius * 0.7;
    
    return {
      x: center.x + textRadius * Math.cos(midAngle),
      y: center.y + textRadius * Math.sin(midAngle),
    };
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg
          ref={wheelRef}
          width="300"
          height="300"
          viewBox="0 0 300 300"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? 'transform 5s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
          }}
          className="mb-4"
        >
          {names.map((_, index) => (
            <g key={index}>
              <path
                d={getSlicePath(index)}
                fill={COLORS[index % COLORS.length]}
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <text
                x={getTextPosition(index).x}
                y={getTextPosition(index).y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
                transform={`rotate(${rotation + (360 / names.length) * index + 90}, ${getTextPosition(index).x}, ${getTextPosition(index).y})`}
              >
                {names[index]}
              </text>
            </g>
          ))}
        </svg>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-red-600"></div>
      </div>
      
      <button
        onClick={handleSpin}
        disabled={spinning || names.length < 2}
        className={`px-6 py-3 rounded-full font-bold text-white ${
          names.length < 2 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        } transition-colors`}
      >
        {spinning ? 'SPINNING...' : 'SPIN'}
      </button>
    </div>
  );
};

export default Wheel;
