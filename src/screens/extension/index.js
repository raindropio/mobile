import React from 'react'
import Stack from 'co/navigation/stack'
import { Fade } from 'co/navigation/transition'

import Init from './init'
import Auth from './auth'
import ExtensionMode from 'screens/settings/extension_mode'
import Close from './close'

const screenOptions = {
    ...Fade,
    cardShadowEnabled: false,
    cardOverlayEnabled: false
}

function Extension() {
    return (
        <Stack.Navigator mode='modal' screenOptions={screenOptions}>
            <Stack.Screen name='init' component={Init} options={Init.options} />
            <Stack.Screen name='auth' component={Auth} options={Auth.options} />
            <Stack.Screen name='extension_mode' component={ExtensionMode} options={ExtensionMode.options} />
            <Stack.Screen name='close' component={Close} options={Close.options} />
        </Stack.Navigator>
    )
}

Extension.options = {
    stackPresentation: 'transparentModal',
    stackAnimation: 'fade'
}

export default Extension