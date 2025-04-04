import { Image, View } from 'react-native'
import React from 'react'
import { Text } from '@/components/ui'
import { Link } from 'expo-router'
import Icons from '@/components/Icons'

export default function HomeScreen() {
  return (
    <View className='flex-1 bg-bg py-4 flex flex-col gap-4'>
      <View className='flex flex-col items-center justify-center gap-2 border-b border-black/10 pb-4'>
        <Text className='text-xl'>özgürlüğün için</Text>
        <Text className='text-5xl text-red-500' varriant='bold'>Boykotla!</Text>
      </View>
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
  return (
    <View className='flex-1 bg-bg py-4 flex flex-col gap-4'>
      <View className='flex flex-col items-center justify-center gap-2 border-b border-black/10 pb-4'>
        <Text className='text-xl'>özgürlüğün için</Text>
        <Text className='text-5xl text-red-500' varriant='bold'>Boykotla!</Text>
      </View>
      <View className='flex items-center justify-center gap-4 px-4'>
        <Image source={require('@/assets/images/KOL.png')}
          className='size-80'
          resizeMode='contain'
          width={600}
          height={1200} />
        <View className='flex flex-col items-center justify-center gap-1'>
          <Text className='text-3xl'>Sıradaki boykot</Text>
          <Text className='text-red-500 text-6xl' varriant='bold'>6 gün</Text>
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