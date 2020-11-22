import React from 'react';
import { KeyboardAvoidingView as KAV, StatusBar } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';

export function KeyboardAvoidingView({ children, style }) {
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
}