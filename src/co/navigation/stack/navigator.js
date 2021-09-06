import React, { useMemo, useContext } from 'react'
import { Platform } from 'react-native'
import { ThemeContext } from 'styled-components'

import globalScreenOptions from './screenOptions'

export default (Stack)=>
    function Navigator(props) {
        const { isExtension } = useContext(ThemeContext)

        const screenOptions = useMemo(()=>({
            ...globalScreenOptions,
            ...props.screenOptions||{}
        }), [props.screenOptions])

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

        return (
            <Stack.Navigator 
                detachInactiveScreens={detachInactiveScreens}
                {...props}
                screenOptions={screenOptions} />
        )
    }