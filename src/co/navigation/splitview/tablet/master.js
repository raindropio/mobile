import React, { useMemo, useEffect } from 'react'
import { ThemeProvider, useTheme } from 'styled-components'
import NavigationContainer from 'co/navigation/container'
import { useNavigationBuilder, createNavigatorFactory, StackRouter, DrawerActions } from '@react-navigation/native';
import { StackView } from '@react-navigation/stack'
import globalScreenOptions from 'co/navigation/stack/screenOptions'

let _dispatch

const MyStackRouter = options => {
    const router = StackRouter(options);
  
    return {
        ...router,

        getStateForAction(state, action, options) {
            if (_dispatch){
                _dispatch(DrawerActions.openDrawer())
                _dispatch(action)
            }

            if (action.type == 'GO_BACK')
                return router.getStateForAction(state, action, options)

            return state
        }
    }
}

function StackNavigator({
    initialRouteName,
    backBehavior,
    children,
    screenOptions,
    ...rest
}) {
    const { state, descriptors, navigation } = useNavigationBuilder(MyStackRouter, {
        initialRouteName,
        backBehavior,
        children,
        screenOptions: {
            ...globalScreenOptions,
            ...screenOptions,
        },
    });

    return (
        <StackView
            {...rest}
            state={state}
            navigation={navigation}
            descriptors={descriptors}
        />
    )
}

const Stack = createNavigatorFactory(StackNavigator)()

function Navigator({ navigation, children }) {
    const { background } = useTheme()

    const theme = useMemo(
        ()=>({background: {...background, regular: background.sidebar} }),
        [background.sidebar]
    )

    useEffect(()=>{
        _dispatch = navigation.dispatch
    }, [navigation])

    return (
        <ThemeProvider theme={theme}>
            <NavigationContainer independent>
                <Stack.Navigator>
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