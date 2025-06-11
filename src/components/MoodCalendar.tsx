import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { MoodCalendarDay } from '../types';

interface MoodCalendarProps {
  calendarData: MoodCalendarDay[];
  currentMonth: number;
  currentYear: number;
  onMonthChange: (month: number, year: number) => void;
}

const MoodCalendar: React.FC<MoodCalendarProps> = ({
  calendarData,
  currentMonth,
  currentYear,
  onMonthChange,
}) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      onMonthChange(11, currentYear - 1);
    } else {
      onMonthChange(currentMonth - 1, currentYear);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      onMonthChange(0, currentYear + 1);
    } else {
      onMonthChange(currentMonth + 1, currentYear);
    }
  };

  // Get first day of month and calculate grid
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  const calendarGrid = [];
  
  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    calendarGrid.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayData = calendarData.find(d => {
      const date = new Date(d.date);
      return date.getDate() === day;
    });
    calendarGrid.push(dayData);
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-6 h-6 text-lavender-500" />
          <h3 className="font-fredoka text-xl font-bold text-gray-800">
            Mood Calendar
          </h3>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <h4 className="font-fredoka font-semibold text-lg text-gray-800 min-w-[140px] text-center">
            {monthNames[currentMonth]} {currentYear}
          </h4>
          
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Week day headers */}
        {weekDays.map(day => (
          <div key={day} className="text-center py-2 text-sm font-fredoka font-medium text-gray-500">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {calendarGrid.map((dayData, index) => {
          if (!dayData) {
            return <div key={index} className="aspect-square"></div>;
          }

          const date = new Date(dayData.date);
          const day = date.getDate();
          const hasData = dayData.analyses.length > 0;

          return (
            <div
              key={dayData.date}
              className={`aspect-square rounded-lg flex items-center justify-center text-sm font-fredoka font-medium transition-all duration-200 cursor-pointer hover:scale-105 ${
                hasData
                  ? 'text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
              }`}
              style={{
                backgroundColor: hasData ? dayData.color : undefined,
              }}
              title={hasData ? `${dayData.mood} (${dayData.analyses.length} analysis${dayData.analyses.length > 1 ? 'es' : ''})` : 'No data'}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-600 mb-2 font-fredoka font-medium">Mood Legend:</p>
        <div className="flex flex-wrap gap-2 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Happy</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span>Excited</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span>Playful</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
            <span>Content</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>Anxious</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Stressed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodCalendar;