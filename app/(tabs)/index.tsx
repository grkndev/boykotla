import { Image, View } from 'react-native'
import React from 'react'
import { Text } from '@/components/ui'
import { Link } from 'expo-router'
import Icons from '@/components/Icons'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import Header from '@/components/Header'
export default function HomeScreen() {
  const { data: date, isLoading, error } = useQuery({
    queryKey: ['date'],
    queryFn: async () => {
      try {
        // Calling the external API directly instead of going through our API route
        const response = await fetch('https://boykot.grkn.dev/api/date')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        return data
      } catch (err) {
        console.error('Error fetching date:', err)
        throw err
      }
    }
  })

  if (isLoading) {
    return (
      <View className='flex-1 items-center justify-center bg-bg'>
        <Text>Yükleniyor...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View className='flex-1 items-center justify-center bg-bg'>
        <Text>Bir hata oluştu: {error.message}</Text>
      </View>
    )
  }
  if (date.nextDate === date.today)
    return (
      <View className='flex-1 bg-bg py-4 flex flex-col gap-4'>
        <Header />
        <View className='flex-1 items-center justify-center gap-4 px-4'>
          <View className='flex flex-col items-center justify-center gap-4'>
            <Icons name='Ban' width={150} height={150} color='#FB2C36' />
            <View className='flex flex-col items-center justify-center gap-1'>
              <Text className='text-3xl'>Bugün</Text>
              <Text className='text-red-500 text-6xl' varriant='bold'>BOYKOT!</Text>
            </View>
          </View>
          <View className='flex flex-col gap-2'>
            <Text className='text-center'>
              Bugün, Haklarımızı savunmak, demokrasimizi korumak, sosyal medyada susuturulmaya karşı boykotluyoruz!
              Bugün hayati olmadıkça hiç bir şekilde harcama yapmıyor ve artık bu düzensizliğe dur diyoruz.
              {"\n\n"}
              Diğer günlerde harcama yapabilirsiniz ancak <Link href='/brands' className='text-red-500 underline'>burada</Link> yer alan boykot listesinde ki markalar sürekli boykot altında olacaktır.
            </Text>
          </View>
        </View>
      </View>
    )
  else
    return (
      <View className='flex-1 bg-bg py-4 flex flex-col gap-4'>
        <Header />
        <View className='flex items-center justify-center gap-4 px-4'>
          <Image source={require('@/assets/images/KOL.png')}
            className='size-80'
            resizeMode='contain'
            width={600}
            height={1200} />
          <View className='flex flex-col items-center justify-center gap-1'>
            <Text className='text-3xl'>Sıradaki boykot</Text>
            <Text className='text-red-500 text-6xl' varriant='bold'>{dayjs(date.nextDate).diff(dayjs(date.currentDate), 'day')} gün</Text>
            <Text className='text-3xl'>sonra</Text>
          </View>
          <View className='flex flex-col gap-2'>
            <Text>
              Haklarımızı savunmak, demokrasimizi korumak, sosyal medyada susuturulmaya karşı boykotluyoruz!
              Bugün hayati olmadıkça hiç bir şekilde harcama yapmıyor ve artık bu düzensizliğe dur diyoruz.
              {"\n\n"}
              Diğer günlerde harcama yapabilirsiniz ancak <Link href='/brands' className='text-red-500 underline'>burada</Link> yer alan boykot listesinde ki markalar sürekli boykot altında olacaktır.
            </Text>
          </View>
        </View>
      </View>
    )
}