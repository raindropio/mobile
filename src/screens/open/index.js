/*
    Params:
        bookmark: {}
        as: null, 'web', 'preview', 'cache'
        presentation: null, 'push'
*/

import React from 'react'
import { store } from 'data'
import Stack from 'co/navigation/stack'

import Internal from './internal'
import System from './system'
import Safari from './safari'
import Chrome from './chrome'

const getBrowser = ()=>
    store.getState().local.browser

function Open({ route: { params } }) {
    return (
        <Stack.Navigator 
            notmodal={params.presentation == 'push'} 
            initialRouteName={getBrowser()}>
            <Stack.Screen name='internal' component={Internal} options={Internal.options} initialParams={params} />
            <Stack.Screen name='system' component={System} options={System.options} initialParams={params} />
            <Stack.Screen name='safari' component={Safari} options={Safari.options} initialParams={params} />
            <Stack.Screen name='chrome' component={Chrome} options={Chrome.options} initialParams={params} />
        </Stack.Navigator>
    )
}

Open.options = ({ route: { params: { presentation } } })=>({
    ...(presentation ? {
        stackPresentation: presentation
    } : {}),

    //system, safari and chrome doesn't need any UI
    ...(getBrowser() != 'internal' ? {
        stackPresentation: 'transparentModal',
        contentStyle: { opacity: 0 }
    } : {})
})

export default Open