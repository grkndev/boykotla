import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Configure how notifications appear when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Request permissions for notifications
export async function requestNotificationPermissions() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Failed to get notification permissions!');
    return false;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return true;
}

// Schedule a notification for boycott day
export async function scheduleBoycottNotification(boycottDate: Date, title: string, body: string) {
  // Set time to 9:00 AM on the boycott day
  const scheduledDate = new Date(boycottDate);
  scheduledDate.setHours(9, 0, 0, 0);
  
  return await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: { type: 'boycott-day' },
    },
    trigger: {
      channelId: 'default',
      hour: 9,
      minute: 0,
      repeats: false,
      date: scheduledDate
    },
  });
}

// Schedule a notification for the evening before boycott day
export async function scheduleEveningBeforeNotification(boycottDate: Date, title: string, body: string) {
  // Create a copy of the boycott date
  const eveningBefore = new Date(boycottDate);
  // Set it to the day before
  eveningBefore.setDate(eveningBefore.getDate() - 1);
  // Set the time to 19:00 (7 PM)
  eveningBefore.setHours(19, 0, 0, 0);
  
  return await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: { type: 'boycott-reminder' },
    },
    trigger: {
      channelId: 'default',
      hour: 19,
      minute: 0,
      repeats: false,
      date: eveningBefore
    },
  });
}

// Cancel all scheduled notifications
export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

// Get all scheduled notifications
export async function getAllScheduledNotifications() {
  return await Notifications.getAllScheduledNotificationsAsync();
} 