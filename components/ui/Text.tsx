import { Text as RNText, TextProps } from 'react-native'
import React from 'react'

export default function Text(
    { children, varriant, ...props }
        : TextProps & { varriant?: 'bold' | 'regular' }
) {
    return (
        <RNText style={{
            minHeight: 24,
            fontFamily:
                varriant === 'bold'
                    ? 'SourGummy_700Bold'
                    : 'SourGummy_400Regular'
        }}
            {...props}
        >
            {children}
        </RNText>
    )
}