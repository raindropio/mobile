import React from 'react'
import Stack from 'co/navigation/stack'
import { FadeTransition } from 'co/navigation/transition'

import Init from './init'
import Auth from './auth'
import Close from './close'

const screenOptions = {
    ...FadeTransition,
    cardShadowEnabled: false,
    cardOverlayEnabled: false
}

export default function extension() {
    return (
        <Stack.Group screenOptions={screenOptions}>
            <Stack.Screen name='init' component={Init} options={Init.options} />
            <Stack.Screen name='auth' component={Auth} options={Auth.options} />
            <Stack.Screen name='close' component={Close} options={Close.options} />
        </Stack.Group>
    )
}