import { Pressable, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  interpolateColor 
} from 'react-native-reanimated';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
  className?: string;
}

const Switch = ({ 
  value, 
  onValueChange, 
  activeColor = '#4CAF50', 
  inactiveColor = '#rgba(0,0,0,0.1)', 
  thumbColor = '#FFFFFF',
  className = ''
}: SwitchProps) => {
  const offset = useSharedValue(value ? 1 : 0);
  
  // Update animation when value changes externally
  useEffect(() => {
    offset.value = withSpring(value ? 1 : 0, {
      stiffness: 200,
      damping: 17,
      mass: 0.8
    });
  }, [value, offset]);

  const handlePress = () => {
    onValueChange(!value);
  };

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      offset.value,
      [0, 1],
      [inactiveColor, activeColor]
    );

    return {
      backgroundColor
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value * 20, {
            damping: 17,
            stiffness: 200,
            mass: 0.1,
          }),
        },
      ],
    };
  });

  return (
    <Pressable onPress={handlePress} className={className}>
      <Animated.View 
        style={[styles.track, trackAnimatedStyle]}
        className="rounded-full"
      >
        <Animated.View 
          style={[styles.thumb, thumbAnimatedStyle, { backgroundColor: thumbColor }]}
          className="rounded-full shadow-md"
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 50,
    height: 30,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  thumb: {
    width: 20,
    height: 20,
  },
});

export default Switch; 