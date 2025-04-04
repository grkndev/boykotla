import { View } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { Text } from '../ui'
import { useQuery } from '@tanstack/react-query'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    runOnJS
} from 'react-native-reanimated'

export default function Header() {
    const [currentItem, setCurrentItem] = useState({ title: "", image: "" })
    const [currentIndex, setCurrentIndex] = useState(0)
    const opacity = useSharedValue(1)

    const { data: headerItems, isLoading, error } = useQuery({
        queryKey: ['headerText'],
        queryFn: async () => {
            try {
                // Calling the external API directly instead of going through our API route
                const response = await fetch('https://boykot.grkn.dev/api/title')
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

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        }
    })

  

    // Use either API data or mockData
    const itemsToUse = headerItems && headerItems.length > 0 ? headerItems : []

    // Wrap state updates in useCallback so they can be passed to runOnJS
    const updateContent = useCallback((index: number) => {
        setCurrentIndex(index)
        setCurrentItem(itemsToUse[index])
    }, [itemsToUse])

    useEffect(() => {
        if (itemsToUse.length === 0) return

        // Initialize with first item
        updateContent(0)

        let localIndex = 0
        const interval = setInterval(() => {
            localIndex = (localIndex + 1) % itemsToUse.length

            // Fade out
            opacity.value = withTiming(0, {
                duration: 500,
                easing: Easing.out(Easing.ease),
            }, () => {
                // Use runOnJS to call state update functions from the UI thread
                runOnJS(updateContent)(localIndex)

                // Fade in
                opacity.value = withTiming(1, {
                    duration: 500,
                    easing: Easing.in(Easing.ease),
                })
            })
        }, 5000) // Total time for each item

        return () => clearInterval(interval)
    }, [itemsToUse, updateContent])



    if (isLoading) {
        return (
            <View className='flex flex-col items-center justify-center gap-2 border-b border-black/10 pb-4'>
                <Text className='text-xl'>Yükleniyor...</Text>
                <Text className='text-5xl text-red-500' varriant='bold'>Boykotla!</Text>
            </View>
        )
    }

    if (error) {
        return (
            <View className='flex flex-col items-center justify-center gap-2 border-b border-black/10 pb-4'>
                <Text className='text-xl'>Bir hata oluştu</Text>
                <Text className='text-5xl text-red-500' varriant='bold'>Boykotla!</Text>
            </View>
        )
    }

    return (
        <View className='flex flex-col items-center justify-center gap-2 border-b border-black/10 pb-4'>
            <Animated.View style={animatedStyle} className="items-center">

                <Text className='text-sm text-center'>{currentItem.title}</Text>
            </Animated.View>
            <Text className='text-5xl text-red-500' varriant='bold'>Boykotla!</Text>
        </View>
    )
}