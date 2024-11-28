import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function WeatherGraph({ weather, selectedDay, selectedData, isDarkMode }) {
    const dataColors = {
        temp: isDarkMode ? '#60A5FA' : '#2563EB',
        humidity: isDarkMode ? '#34D399' : '#059669',
        rain: isDarkMode ? '#FBBF24' : '#D97706',
        snow: isDarkMode ? '#93C5FD' : '#3B82F6',
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            return (
                <div className={`p-3 rounded-lg shadow-lg border ${
                    isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-800'
                }`}>
                    <p className="font-semibold">{label}:00</p>
                    <p style={{ color: data.color }}>
                        {data.name}: {data.value.toFixed(2)}{' '}
                        {selectedData === 'temp'
                            ? '°C'
                            : selectedData === 'humidity'
                            ? '%'
                            : 'mm'}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="h-[350px] w-full">
            <ResponsiveContainer width="97%" height={350}>
                <LineChart data={weather.forecast[selectedDay].hourly}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#4B5563' : '#E5E7EB'} />
                    <XAxis
                        dataKey="time"
                        tickFormatter={(time) => time + ':00'}
                        tick={{ fill: isDarkMode ? '#D1D5DB' : '#4B5563', fontSize: 12 }}
                        stroke={isDarkMode ? '#6B7280' : '#9CA3AF'}
                    />
                    <YAxis 
                        tick={{ fill: isDarkMode ? '#D1D5DB' : '#4B5563', fontSize: 12 }}
                        stroke={isDarkMode ? '#6B7280' : '#9CA3AF'}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey={selectedData}
                        stroke={dataColors[selectedData]}
                        strokeWidth={3}
                        dot={{ fill: dataColors[selectedData], strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 8 }}
                    />
                    <Legend 
                        wrapperStyle={{
                            paddingTop: '20px',
                            color: isDarkMode ? '#D1D5DB' : '#4B5563'
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}