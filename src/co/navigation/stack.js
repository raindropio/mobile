import { createNativeStackNavigator } from '@react-navigation/native-stack'
import styled from 'styled-components/native'

const Stack = createNativeStackNavigator();

export default {
    Navigator: styled(Stack.Navigator).attrs(({theme})=>({
        screenOptions: {
            headerTintColor: theme.color.accent,
            headerTitleStyle: {
                color: theme.text.regular
            },
            statusBarColor: theme.background.regular,
            statusBarStyle: theme.dark ? 'light' : 'dark',
            navigationBarColor: theme.background.regular
        }
    }))``,
    Group: Stack.Group,
    Screen: Stack.Screen
}