import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Award } from 'lucide-react';
import { MoodTrend } from '../types';

interface MoodTrendsProps {
  trends: MoodTrend[];
  moodOfTheWeek: { mood: string; count: number; color: string };
}

const MoodTrends: React.FC<MoodTrendsProps> = ({ trends, moodOfTheWeek }) => {
  return (
    <div className="space-y-6">
      {/* Mood of the Week Badge */}
      <div className="bg-gradient-to-r from-coral-50 to-mint-50 rounded-2xl p-6 border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-coral-100 rounded-full flex items-center justify-center">
            <Award className="w-6 h-6 text-coral-600" />
          </div>
          <div>
            <h3 className="font-fredoka text-xl font-bold text-gray-800">
              Mood of the Week
            </h3>
            <p className="text-gray-600">Most frequent mood in the last 7 days</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div
            className="w-8 h-8 rounded-full"
            style={{ backgroundColor: moodOfTheWeek.color }}
          ></div>
          <div>
            <span className="font-fredoka text-2xl font-bold text-gray-800">
              {moodOfTheWeek.mood}
            </span>
            <p className="text-gray-600">
              {moodOfTheWeek.count} time{moodOfTheWeek.count !== 1 ? 's' : ''} this week
            </p>
          </div>
        </div>
      </div>

      {/* Mood Trends Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="w-6 h-6 text-lavender-500" />
          <h3 className="font-fredoka text-xl font-bold text-gray-800">
            Mood Trends (8 Weeks)
          </h3>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="week" 
                stroke="#64748b"
                fontSize={12}
                fontFamily="Fredoka"
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                fontFamily="Fredoka"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  fontFamily: 'Fredoka'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="happy" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                name="Happy"
              />
              <Line 
                type="monotone" 
                dataKey="excited" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                name="Excited"
              />
              <Line 
                type="monotone" 
                dataKey="playful" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                name="Playful"
              />
              <Line 
                type="monotone" 
                dataKey="anxious" 
                stroke="#f97316" 
                strokeWidth={3}
                dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                name="Anxious"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Current Week Breakdown */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="font-fredoka text-xl font-bold text-gray-800 mb-6">
          This Week's Mood Breakdown
        </h3>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[trends[trends.length - 1]]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis hide />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                fontFamily="Fredoka"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  fontFamily: 'Fredoka'
                }}
              />
              <Bar dataKey="happy" fill="#10b981" name="Happy" radius={[4, 4, 0, 0]} />
              <Bar dataKey="excited" fill="#f59e0b" name="Excited" radius={[4, 4, 0, 0]} />
              <Bar dataKey="playful" fill="#8b5cf6" name="Playful" radius={[4, 4, 0, 0]} />
              <Bar dataKey="content" fill="#06b6d4" name="Content" radius={[4, 4, 0, 0]} />
              <Bar dataKey="curious" fill="#3b82f6" name="Curious" radius={[4, 4, 0, 0]} />
              <Bar dataKey="anxious" fill="#f97316" name="Anxious" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MoodTrends;