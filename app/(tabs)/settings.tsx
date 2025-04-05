import { Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text, Switch } from '@/components/ui'
import { Link } from 'expo-router'
import { Alert } from 'react-native'
import { useBoycottNotificationsApi } from '@/utils/notifications/useBoycottNotificationsApi'

export default function SettingsScreen() {
 
  const { 
    permissionGranted, 
    scheduledNotifications, 
    scheduleBoycottNotifications, 
    cancelBoycottNotifications,
    refreshScheduledNotifications,
    isLoading
  } = useBoycottNotificationsApi();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  
  // Check permissions and schedule notifications if granted
  useEffect(() => {
    const setupNotifications = async () => {
      await refreshScheduledNotifications();
      
      // If permissions are granted, turn on switch and ensure notifications are scheduled
      if (permissionGranted) {
        setNotificationsEnabled(true);
        
        // If no notifications are scheduled yet, schedule them automatically
        if (scheduledNotifications.length === 0) {
          await scheduleBoycottNotifications();
        }
      } else {
        setNotificationsEnabled(false);
      }
    };
     
    setupNotifications();
  }, [permissionGranted]); // Re-run when permission status changes

  // Handle notification toggle
  const handleToggleNotifications = async (value: boolean) => {
    // Don't process the toggle if loading or no permission
    if (isLoading || permissionGranted === false) {
      return;
    }
    
    try {
      if (value) {
        const success = await scheduleBoycottNotifications();
        if (success) {
          setNotificationsEnabled(true);
          Alert.alert(
            'Bildirimler Etkinleştirildi',
            'Boykot bildirimleri başarıyla planlandı. Boykot günlerinde ve bir gün öncesinde bildirim alacaksınız.'
          );
        } else {
          Alert.alert(
            'Bildirim Hatası',
            'Bildirimler planlanırken bir hata oluştu. Lütfen tekrar deneyin.'
          );
        }
      } else {
        await cancelBoycottNotifications();
        setNotificationsEnabled(false);
        Alert.alert(
          'Bildirimler Devre Dışı',
          'Tüm boykot bildirimleri iptal edildi.'
        );
      }
    } catch (error) {
      console.error('Error toggling notifications:', error);
      Alert.alert(
        'Hata',
        'Bildirim ayarları güncellenirken bir hata oluştu.'
      );
    }
  };

  return (
    <View className='flex-1 items-center pt-4 bg-bg'>
      <View className='flex flex-col items-center justify-center gap-2 border-b border-black/10 pb-4 w-full'>
        <Text className='text-3xl' varriant='bold'>Ayarlar</Text>
      </View>
      <View className='w-full px-4 py-6'>
        <View className='flex-row items-center justify-between mb-6'>
          <Text className='text-lg'>Bildirimler</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleToggleNotifications}
            activeColor="#FF6B00"
          />
        </View>

        {permissionGranted === false && (
          <View className='mb-4 p-3 bg-red-100 rounded'>
            <Text className='text-red-700'>
              Bildirim izni verilmedi. Bildirimleri etkinleştirmek için lütfen uygulama ayarlarından bildirim iznini verin.
            </Text>
          </View>
        )}
      </View>

      <View className='absolute bottom-0 left-0 right-0 flex flex-row items-center justify-center space-x-2'>
        <Text>Boykotla bir </Text>
        <Link href='https://grkn.dev' className='mt-1 ml-1'>
          <Image source={require('@/assets/images/gdev_text_dark.png')}
            className='size-20'
            resizeMode='contain'
            width={600}
            height={1200} />
        </Link>
        <Text>uygulamasıdır.</Text>
      </View>
    </View>
  )
}