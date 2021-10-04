import React, { useMemo, useContext } from 'react'
import { Platform } from 'react-native'
import { isTablet } from 'modules/native'
import { createNavigatorFactory, useNavigationBuilder, StackRouter as DefaultStackRouter } from '@react-navigation/native'
import { StackView } from '@react-navigation/stack'
import { FormSheetTransition } from 'co/navigation/transition'
import { ThemeContext } from 'styled-components'

import Header from 'co/navigation/header'
import defaultScreenOptions from './screenOptions'

const StackRouter = ({ onFailedStateChange, ...options }) => {
    const router = DefaultStackRouter(options)

    return {
        ...router,
        getStateForAction(state, action, options) {
            const newState = router.getStateForAction(state, action, options)
            
            if (!newState && 
                typeof onFailedStateChange == 'function'){
                const replace = onFailedStateChange(state, action, options)
                if (replace)
                    return router.getStateForAction(state, replace, options)

                return state
            }

            return newState
        }
    }
}

function StackNavigator({
    initialRouteName,
    backBehavior,
    children,
    screenOptions={},
    onFailedStateChange,
    ...rest
}) {
    const { isExtension } = useContext(ThemeContext)

    const detachInactiveScreens = useMemo(()=>{
        //turn on in Android <=27, because otherwise taps in webview can respond through active screen
        if (Platform.OS == 'android' && Platform.Version<=27)
            return true

        //memory usage in iOS extension is crutial, so detach inactive screens where possible
        if (Platform.OS == 'ios' && isExtension)
            return true

        //false works hugely faster! but more memory needed
        return false
    }, [isExtension])

    const { state, descriptors, navigation } = useNavigationBuilder(StackRouter, {
        onFailedStateChange,
        initialRouteName,
        backBehavior,
        children,
        screenOptions: props=>({
            //form sheet transition in tablets
            ...(isTablet && !isExtension && !props.navigation.getParent() && props.navigation.getState().index ? FormSheetTransition : {}),

            //modal specific
            ...(props.navigation.getParent() && props.navigation.getParent().getState().index ? {
                ...(!props.navigation.getState().index ? { headerLeft: null } : {}),
                headerStatusBarHeight: 0,
                headerRight: ()=>(
                    <Header.Button
                        icon='close-circle'
                        variant='fill'
                        color='text.secondary'
                        onPress={props.navigation.getParent().goBack} />
                )
            } : {}),

            //extension window
            ...(isExtension && {
                headerLeft: ()=>(
                    <Header.Back
                        onPress={props.navigation.goBack} />
                )
            }),

            ...(typeof screenOptions == 'function' ?
                screenOptions(props) :
                screenOptions
            ),
        }),
        defaultScreenOptions
    })

    return (
        <StackView
            detachInactiveScreens={detachInactiveScreens}
            {...rest}
            state={state}
            navigation={navigation}
            descriptors={descriptors}
        />
    )
}

export default createNavigatorFactory(StackNavigator)()