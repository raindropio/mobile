import * as React from 'react'
import { Platform } from 'react-native'

import Header from 'co/navigation/header'

export default {
    //header
    headerBackTitle: ' ', 
    headerBackImage: ()=>(
        <Header.Back enabled={false} />
    ),
    headerStyle: {
        shadowOpacity: 1
    },
    ...(Platform.OS=='ios' ? {
        headerTitleStyle: {
            marginHorizontal: 15
        }
    } : {}),

    //activities
    cardOverlayEnabled: true,
    gestureVelocityImpact: .6,
    animationTypeForReplace: 'push'
}