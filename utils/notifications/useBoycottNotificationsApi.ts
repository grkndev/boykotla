import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { 
  requestNotificationPermissions,
  scheduleBoycottNotification,
  scheduleEveningBeforeNotification,
  cancelAllNotifications,
  getAllScheduledNotifications
} from './index';
import { fetchBoycottDates, getBoycottEvents, BoycottEvent } from '../api';

export function useBoycottNotificationsApi() {
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const [scheduledNotifications, setScheduledNotifications] = useState<Notifications.NotificationRequest[]>([]);
  const [boycottEvents, setBoycottEvents] = useState<BoycottEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Request permissions on component mount
  useEffect(() => {
    async function getPermissions() {
      const granted = await requestNotificationPermissions();
      setPermissionGranted(granted);
    }
    
    getPermissions();
  }, []);

  // Fetch boycott events from API
  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchBoycottDates();
        const events = getBoycottEvents(data);
        setBoycottEvents(events);
      } catch (error) {
        console.error('Error fetching boycott events:', error);
        setError('Boykot bilgilerini alırken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchEvents();
  }, []);

  // Function to get all scheduled notifications
  const refreshScheduledNotifications = async () => {
    const notifications = await getAllScheduledNotifications();
    setScheduledNotifications(notifications);
    return notifications;
  };

  // Schedule notifications for all boycott events
  const scheduleBoycottNotifications = async () => {
    if (!permissionGranted) {
      const granted = await requestNotificationPermissions();
      if (!granted) {
        return false;
      }
      setPermissionGranted(granted);
    }

    try {
      // First cancel any existing notifications
      await cancelAllNotifications();
      
      // Schedule notifications for all upcoming boycott events
      for (const event of boycottEvents) {
        if (event.date > new Date()) { // Only schedule future events
          // Schedule notification for boycott day
          await scheduleBoycottNotification(
            event.date, 
            `${event.title} bugün!`, 
            `${event.description}. Katılımınız için teşekkürler.`
          );
          
          // Schedule notification for evening before
          await scheduleEveningBeforeNotification(
            event.date, 
            `${event.title} yarın başlıyor`, 
            `Yarın ${event.title} eylemi başlıyor. Hazırlıklarınızı tamamlayın.`
          );
        }
      }
      
      // Refresh the list of scheduled notifications
      await refreshScheduledNotifications();
      
      return true;
    } catch (error) {
      console.error('Error scheduling notifications:', error);
      return false;
    }
  };

  // Cancel all scheduled notifications
  const cancelBoycottNotifications = async () => {
    try {
      await cancelAllNotifications();
      await refreshScheduledNotifications();
      return true;
    } catch (error) {
      console.error('Error canceling notifications:', error);
      return false;
    }
  };

  return {
    permissionGranted,
    scheduledNotifications,
    boycottEvents,
    isLoading,
    error,
    scheduleBoycottNotifications,
    cancelBoycottNotifications,
    refreshScheduledNotifications
  };
} 