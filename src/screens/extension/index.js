import React from 'react'
import Stack from 'co/navigation/stack'
import { Fade } from 'co/navigation/transition'

import Init from './init'
import Auth from './auth'
import SelectCollection from './select-collection'
import Create from 'screens/create'
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
            <Stack.Screen name='select-collection' component={SelectCollection} options={SelectCollection.options} />
            <Stack.Screen name='create' component={Create} options={Create.options} />
            <Stack.Screen name='extension_mode' component={ExtensionMode} options={ExtensionMode.options} />
            <Stack.Screen name='close' component={Close} options={Close.options} />
        </Stack.Navigator>
    )
}

Extension.options = {
    stackPresentation: 'transparentModal',
    stackAnimation: 'none'
}

export default Extension