import React from 'react'
import { Platform } from 'react-native'
import Stack from 'co/navigation/stack'

import Sheet from './sheet'

function Custom() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='sheet' component={Sheet} options={Sheet.options} />
        </Stack.Navigator>
    )
}

Custom.options = {
    stackPresentation: Platform.OS=='ios' ? 'modal' : 'transparentModal',
    stackAnimation: Platform.OS=='ios' ? 'default' : 'fade'
}

export default Custom