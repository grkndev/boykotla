import { View } from 'react-native'
import React from 'react'
import { Text } from '@/components/ui'

export default function InfoScreen() {
  return (
    <View className='flex-1 p-4 bg-bg'>
      <View className='flex flex-col gap-4'>
        <View className='flex flex-col gap-2'>
          <Text varriant='bold' className='text-2xl text-red-500'>Neden Boykot?</Text>
          <Text>Halkın haber alma hakkını gasbedene, haksıza, hukuksuza, halkı yok sayana, görmeyen, duymayan, söylemeyene, milli iradeye saygı göstermeyene cevabımız, tüketimden gelen hakkımız!</Text>
        </View>
        <View className='flex flex-col gap-2'>
          <Text varriant='bold' className='text-2xl text-red-500'>Neden 6 günde bir?</Text>
          <Text>İlk boykotumuz çarşamba ise sonraki hafta salı (çarşambanın 6 gün sonrası) olacak. Sıralama; çarşamba, salı, pazartesi, pazar, cumartesi... şeklinde gidecek. Böylece her hafta farklı bir gün boykot etmiş olacağız.</Text>
        </View>
        <View className='flex flex-col gap-2'>
          <Text varriant='bold' className='text-2xl text-red-500'>Unutma, unutturma!</Text>
          <Text>6 günün takibini yaparken kafa karışıklığı yaşamamak için uygulamanın bildirim özelliğini kullanabilir veya telefonundan alarm kurabilirsin ve bundan arkadaşlarına haber ederek onlarında kullanmasını sağlayarak yaygınlaştırabilirsin. Her boykot günü öncesi uygulamadan gelecek bildirim ile çevrene hatırlati boykot gününü kimseye unutturma.</Text>
        </View>
        <View className='flex flex-col gap-2'>
          <Text varriant='bold' className='text-2xl text-red-500'>Boykota sadık kal</Text>
          <Text>Genel tüketim boykotumuzu 6 günde 1, marka fark etmeksizin hiçbir şey satın almayarak yapacağız. Kalan diğer günlerde yandaş markaları boykotlamaya devam edeceğiz.</Text>
        </View>
        <View className='flex flex-col gap-2'>
          <Text varriant='bold' className='text-2xl text-red-500'>YAŞASIN TÜKETMEME ÖZGÜRLÜĞÜ</Text>
          <Text>#SENDEBOYKOTLA</Text>
        </View>
      </View>
    </View>
  )
}