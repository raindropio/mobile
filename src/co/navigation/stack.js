import { createNativeStackNavigator } from '@react-navigation/native-stack'
import styled from 'styled-components/native'
import { Platform } from 'react-native'

const Stack = createNativeStackNavigator();

export default {
    Navigator: styled(Stack.Navigator).attrs(({theme})=>({
        screenOptions: {
            headerTintColor: theme.color.accent,
            headerTitleStyle: {
                color: theme.text.regular
            },
            statusBarAnimation: 'fade',
            statusBarColor: theme.background.regular,
            statusBarStyle: theme.dark ? 'light' : 'dark',
            navigationBarColor: Platform.Version >= 27 ? theme.background.regular : 'black'
        }
    }))``,
    Group: Stack.Group,
    Screen: Stack.Screen
}