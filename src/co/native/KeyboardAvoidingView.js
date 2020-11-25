import React from 'react';
import { Platform, KeyboardAvoidingView as KAV, StatusBar, View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';

export const KeyboardAvoidingView = Platform.select({
    ios: ({ children, style })=>{
        const headerHeight = useHeaderHeight();
    
        return (
            <KAV
                style={style}
                behavior='padding'
                keyboardVerticalOffset={headerHeight + StatusBar.currentHeight}
            >
                {children}
            </KAV>
        );
    },
    android: View
})