import { Analysis, MoodCalendarDay, MoodTrend } from '../types';

const moodColors: Record<string, string> = {
  'Happy': '#10b981', // green
  'Excited': '#f59e0b', // amber
  'Playful': '#8b5cf6', // purple
  'Content': '#06b6d4', // cyan
  'Curious': '#3b82f6', // blue
  'Anxious': '#f97316', // orange
  'Stressed': '#ef4444', // red
  'Hungry': '#eab308', // yellow
  'Territorial': '#7c3aed', // violet
  'Attention-seeking': '#ec4899', // pink
};

export const generateMoodCalendar = (analyses: Analysis[], year: number, month: number): MoodCalendarDay[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendar: MoodCalendarDay[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayAnalyses = analyses.filter(analysis => 
      analysis.timestamp.startsWith(dateStr)
    );

    if (dayAnalyses.length > 0) {
      // Get the most common mood for the day
      const moodCounts: Record<string, number> = {};
      dayAnalyses.forEach(analysis => {
        const mood = analysis.mood.primary;
        moodCounts[mood] = (moodCounts[mood] || 0) + 1;
      });

      const dominantMood = Object.entries(moodCounts)
        .sort(([,a], [,b]) => b - a)[0][0];

      calendar.push({
        date: dateStr,
        mood: dominantMood,
        color: moodColors[dominantMood] || '#6b7280',
        analyses: dayAnalyses
      });
    } else {
      calendar.push({
        date: dateStr,
        mood: '',
        color: '#f3f4f6',
        analyses: []
      });
    }
  }

  return calendar;
};

export const generateMoodTrends = (analyses: Analysis[]): MoodTrend[] => {
  const trends: MoodTrend[] = [];
  const now = new Date();
  
  // Generate data for the last 8 weeks
  for (let i = 7; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - (i * 7));
    weekStart.setHours(0, 0, 0, 0);
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const weekAnalyses = analyses.filter(analysis => {
      const analysisDate = new Date(analysis.timestamp);
      return analysisDate >= weekStart && analysisDate <= weekEnd;
    });

    const moodCounts = {
      happy: 0,
      excited: 0,
      anxious: 0,
      playful: 0,
      content: 0,
      curious: 0
    };

    weekAnalyses.forEach(analysis => {
      const mood = analysis.mood.primary.toLowerCase();
      if (mood in moodCounts) {
        moodCounts[mood as keyof typeof moodCounts]++;
      }
    });

    trends.push({
      week: `${weekStart.getMonth() + 1}/${weekStart.getDate()}`,
      ...moodCounts
    });
  }

  return trends;
};

export const getMoodOfTheWeek = (analyses: Analysis[]): { mood: string; count: number; color: string } => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const recentAnalyses = analyses.filter(analysis => 
    new Date(analysis.timestamp) >= oneWeekAgo
  );

  if (recentAnalyses.length === 0) {
    return { mood: 'No data', count: 0, color: '#6b7280' };
  }

  const moodCounts: Record<string, number> = {};
  recentAnalyses.forEach(analysis => {
    const mood = analysis.mood.primary;
    moodCounts[mood] = (moodCounts[mood] || 0) + 1;
  });

  const [dominantMood, count] = Object.entries(moodCounts)
    .sort(([,a], [,b]) => b - a)[0];

  return {
    mood: dominantMood,
    count,
    color: moodColors[dominantMood] || '#6b7280'
  };
};