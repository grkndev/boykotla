import { View, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import Icons from '../Icons'
import { cn } from '@/utils/utils'
import Text from '@/components/ui/text'

const TabBarComponent = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        // Cleanup
        return () => {
            keyboardShowListener.remove();
            keyboardHideListener.remove();
        };
    }, []);

    const currentRoute = state.routes[state.index].name
    return (
        <>
            {!isKeyboardVisible && (<View className='border-black/10 border-t bg-bg flex flex-row items-center justify-center w-full h-24'>

                {/* HOME */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("index")}
                    className={`flex h-full w-1/4 items-center justify-center $`}>

                    <Icons name={"House"} color={currentRoute === 'index' ? 'black' : '#00000080'} />
                    <Text
                        className={
                            cn(
                                'text-xs ',
                                currentRoute === 'index' ? ' font-bold text-black' : 'text-black/50'
                            )

                        }>Anasayfa</Text>
                </TouchableOpacity>

                {/* INFO */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("info")}
                    className={`flex h-full w-1/4 items-center justify-center`}>

                    <Icons name={"Info"} color={currentRoute === 'info' ? 'black' : '#00000080'} />
                    <Text
                        className={

                            cn(
                                'text-xs',
                                currentRoute === 'info' ? ' font-bold text-black' : 'text-black/50'
                            )
                        }>Mahalle</Text>
                </TouchableOpacity>

                {/* BRANDS */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("brands")}
                    className={
                        `flex h-full w-1/4 items-center justify-center`
                    }>
                    <Icons name={"ShieldX"} color={currentRoute === 'brands' ? 'black' : '#00000080'} />

                    <Text className={
                        cn(
                            'text-xs',
                            currentRoute === 'brands' ? 'font-bold text-black' : 'text-black/50'
                        )
                    }>Markalar</Text>
                </TouchableOpacity>

                {/* PROFILE */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("settings")}
                    className={` flex h-full w-1/4 items-center justify-center`}>
                    <Icons name={"Settings"} color={currentRoute === 'settings' ? 'black' : '#00000080'} />
                    <Text className={
                        cn(
                            'text-xs',
                            currentRoute === 'settings' ? ' font-bold text-black' : 'text-black/50'
                        )
                    }>Ayarlar</Text>
                </TouchableOpacity>

            </View>)}</>
    )
}

export default TabBarComponent