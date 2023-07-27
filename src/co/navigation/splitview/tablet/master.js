import { useMemo, useCallback } from 'react';
import { ThemeProvider, useTheme } from 'styled-components'
import NavigationContainer from 'co/navigation/container'
import { DrawerActions } from '@react-navigation/native'
import Stack, { screenOptions } from 'co/navigation/stack'

function Navigator({ navigation, children }) {
    const { background } = useTheme()

    const theme = useMemo(
        ()=>({background: {...background, regular: background.sidebar} }),
        [background.sidebar]
    )

    const onFailedStateChange = useCallback((state,action)=>{
        navigation.dispatch(DrawerActions.openDrawer())
        navigation.dispatch(action)
    }, [navigation.dispatch])

    return (
        <ThemeProvider theme={theme}>
            <NavigationContainer independent>
                <Stack.Navigator screenOptions={screenOptions} onFailedStateChange={onFailedStateChange}>
                    {children}
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    )
}

export default {
    Navigator,
    Screen: Stack.Screen
}