import { UserSubscription, UpsellTrigger } from '../types';

const SUBSCRIPTION_KEY = 'pawtrix_subscription';
const FREE_USAGE_LIMIT = 5;
const USAGE_RESET_DAYS = 30;

export const subscriptionService = {
  getSubscription(): UserSubscription {
    const stored = localStorage.getItem(SUBSCRIPTION_KEY);
    if (stored) {
      const subscription = JSON.parse(stored);
      // Check if usage should reset (monthly)
      const lastReset = new Date(subscription.lastResetDate);
      const now = new Date();
      const daysSinceReset = Math.floor((now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysSinceReset >= USAGE_RESET_DAYS && subscription.plan === 'free') {
        subscription.usageCount = 0;
        subscription.lastResetDate = now.toISOString();
        this.saveSubscription(subscription);
      }
      
      return subscription;
    }
    
    // Default free subscription
    const defaultSubscription: UserSubscription = {
      isActive: true,
      plan: 'free',
      usageCount: 0,
      lastResetDate: new Date().toISOString()
    };
    
    this.saveSubscription(defaultSubscription);
    return defaultSubscription;
  },

  saveSubscription(subscription: UserSubscription): void {
    localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(subscription));
  },

  incrementUsage(): void {
    const subscription = this.getSubscription();
    subscription.usageCount++;
    this.saveSubscription(subscription);
  },

  canUseFeature(feature: 'analysis' | 'pdf_export' | 'mood_trends' | 'personality'): boolean {
    const subscription = this.getSubscription();
    
    if (subscription.plan === 'pawtrix_plus') {
      return true;
    }
    
    // Free tier limitations
    switch (feature) {
      case 'analysis':
        return subscription.usageCount < FREE_USAGE_LIMIT;
      case 'pdf_export':
      case 'mood_trends':
      case 'personality':
        return false;
      default:
        return true;
    }
  },

  getRemainingUsage(): number {
    const subscription = this.getSubscription();
    if (subscription.plan === 'pawtrix_plus') {
      return Infinity;
    }
    return Math.max(0, FREE_USAGE_LIMIT - subscription.usageCount);
  },

  upgradeToPremium(): void {
    const subscription = this.getSubscription();
    subscription.plan = 'pawtrix_plus';
    subscription.startDate = new Date().toISOString();
    // Set end date to 1 year from now (for demo purposes)
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1);
    subscription.endDate = endDate.toISOString();
    this.saveSubscription(subscription);
  },

  checkUpsellTriggers(analysisCount: number, recentMoods: string[]): UpsellTrigger[] {
    const subscription = this.getSubscription();
    const triggers: UpsellTrigger[] = [];

    // Usage limit trigger
    if (subscription.plan === 'free' && subscription.usageCount >= FREE_USAGE_LIMIT - 1) {
      triggers.push({
        type: 'usage_limit',
        condition: 'Approaching free usage limit',
        priority: 1
      });
    }

    // Mood pattern trigger (3+ anxious moods in recent analyses)
    const anxiousMoods = recentMoods.filter(mood => mood === 'Anxious' || mood === 'Stressed').length;
    if (anxiousMoods >= 3) {
      triggers.push({
        type: 'mood_pattern',
        condition: 'Multiple anxious moods detected',
        priority: 2
      });
    }

    // Personality unlock trigger
    if (analysisCount >= 5 && subscription.plan === 'free') {
      triggers.push({
        type: 'personality_unlock',
        condition: 'Personality analysis available',
        priority: 3
      });
    }

    return triggers.sort((a, b) => a.priority - b.priority);
  }
};