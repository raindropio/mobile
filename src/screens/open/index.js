/*
    Params:
        bookmark: {}
        view: null, 'web', 'preview', 'cache'
        presentation: null, 'push'
*/

import React from 'react'
import { Platform } from 'react-native'
import { store } from 'data'
import Stack from 'co/navigation/stack'

import Internal from './internal'
import Font from './font'
import System from './system'
import Safari from './safari'
import Chrome from './chrome'

const getBrowser = ()=>
    store.getState().local.browser

function Open({ route: { params } }) {
    const { presentation } = params.params || params

    return (
        <Stack.Navigator 
            notmodal={presentation == 'push'} 
            initialRouteName={getBrowser()}>
            <Stack.Screen name='internal' component={Internal} options={Internal.options} initialParams={params} />
            <Stack.Screen name='font' component={Font} options={Font.options} initialParams={params} />

            <Stack.Screen name='system' component={System} options={System.options} initialParams={params} />
            <Stack.Screen name='safari' component={Safari} options={Safari.options} initialParams={params} />
            <Stack.Screen name='chrome' component={Chrome} options={Chrome.options} initialParams={params} />
        </Stack.Navigator>
    )
}

Open.options = ({ route: { params } })=>{
    const { presentation } = params.params || params
    const screen = params.screen || getBrowser()

    return {
        ...(presentation ? {
            stackPresentation: presentation
        } : {}),

        //small screen for font
        ...(screen == 'font' ? {
            contentStyle: {
                height: 400,
                position: 'absolute', left: 0, right: 0, bottom: 0
            },
            ...Platform.select({
                android: {
                    stackPresentation: 'transparentModal',
                    stackAnimation: 'slide_from_bottom'
                },
                default: {
                    stackPresentation: 'formSheet'
                }
            })
        } : {}),
    
        //some screens doesn't need any UI
        ...(['system', 'safari', 'chrome'].includes(screen) ? {
            stackPresentation: 'transparentModal',
            contentStyle: { opacity: 0 }
        } : {})
    }
}

export default Open