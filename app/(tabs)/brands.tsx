import { Image } from 'expo-image'
import { FlatList, View, Dimensions } from 'react-native'
import React from 'react'
import { Text } from '@/components/ui'
import { useQuery } from '@tanstack/react-query'


const { width } = Dimensions.get('window');
const itemWidth = width / 2 - 20; // 2 columns with some padding

export default function BrandsScreen() {
  const { data: brands, isLoading, error } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      try {
        // Calling the external API directly instead of going through our API route
        const response = await fetch('https://boykot.grkn.dev/api/stream')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        return data
      } catch (err) {
        console.error('Error fetching brands:', err)
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

  return (
    <View className='flex-1 pt-4 px-4 bg-bg'>
      <Text className='text-3xl text-center mb-4' varriant='bold'>Yandaş Markalar</Text>
      <View className='flex-1'>
        
        <FlatList
          data={brands}
          numColumns={2}
          contentContainerStyle={{ gap: 10, paddingBottom: 40 }}
          columnWrapperStyle={{ gap: 10, justifyContent: 'space-between' }}
          renderItem={({ item }) => (
            <View className="rounded-lg overflow-hidden" style={{ width: itemWidth }}>
              <Image
                source={`https://boykot.grkn.dev/_next/image?url=${encodeURIComponent(`https://boykotyap.net${item}`)
                  }&w=1080&q=75`}
                style={{
                  width: '100%',
                  aspectRatio: 1,
                }}
                contentFit="cover"
                transition={1000}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  )
}