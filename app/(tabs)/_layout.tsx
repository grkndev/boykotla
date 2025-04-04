import TabBar from '@/components/TabBar';
import { Slot, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function TabLayout() {

  return (
    <SafeAreaView className='flex-1 bg-bg'>
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        initialRouteName='index'

        screenOptions={{
          animation: "shift",
          sceneStyle: {
            backgroundColor: "#FCDCAD"
          },
          headerShown: false,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
        }}>
      </Tabs>
    </SafeAreaView>
  );
}
