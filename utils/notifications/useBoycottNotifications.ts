import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { 
  requestNotificationPermissions,
  scheduleBoycottNotification,
  scheduleEveningBeforeNotification,
  cancelAllNotifications,
  getAllScheduledNotifications
} from './index';

interface BoycottNotificationProps {
  title: string;
  body: string;
  reminderTitle: string;
  reminderBody: string;
  date: Date;
}

export function useBoycottNotifications() {
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const [scheduledNotifications, setScheduledNotifications] = useState<Notifications.NotificationRequest[]>([]);

  // Request permissions on component mount
  useEffect(() => {
    async function getPermissions() {
      const granted = await requestNotificationPermissions();
      setPermissionGranted(granted);
    }
    
    getPermissions();
  }, []);

  // Function to get all scheduled notifications
  const refreshScheduledNotifications = async () => {
    const notifications = await getAllScheduledNotifications();
    setScheduledNotifications(notifications);
    return notifications;
  };

  // Schedule notifications for a boycott
  const scheduleBoycottNotifications = async ({
    title,
    body,
    reminderTitle,
    reminderBody,
    date
  }: BoycottNotificationProps) => {
    if (!permissionGranted) {
      const granted = await requestNotificationPermissions();
      if (!granted) {
        return false;
      }
      setPermissionGranted(granted);
    }

    try {
      // Schedule notification for boycott day
      await scheduleBoycottNotification(date, title, body);
      
      // Schedule notification for evening before
      await scheduleEveningBeforeNotification(date, reminderTitle, reminderBody);
      
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
    scheduleBoycottNotifications,
    cancelBoycottNotifications,
    refreshScheduledNotifications
  };
} 