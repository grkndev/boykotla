import { Image, View } from 'react-native'
import React, { useState } from 'react'
import { Text, Switch } from '@/components/ui'
import { Link } from 'expo-router'

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

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
            onValueChange={setNotificationsEnabled}
            activeColor="#FF6B00"
          />
        </View>


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