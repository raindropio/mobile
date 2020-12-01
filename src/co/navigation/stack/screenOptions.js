import * as React from 'react'
import { Platform } from 'react-native'

import Header from 'co/navigation/header'

const iosBackIconStyle = {marginLeft:-10}

export default {
    //header
    headerBackTitle: ' ', 
    headerBackImage: Platform.select({
        ios: ()=>(
            <Header.Button 
                enabled={false}
                icon='arrow-left-s'
                size='32'
                color='text.secondary'
                style={iosBackIconStyle} />
        ),
        android: ()=>(
            <Header.Button 
                enabled={false}
                icon='arrow-left'
                color='text.secondary' />
        )
    }),
    headerStyle: {
        shadowOpacity: 1
    },
    ...(Platform.OS=='ios' ? {
        headerTitleStyle: {
            marginHorizontal: 30
        }
    } : {}),

    //activities
    cardOverlayEnabled: true,
    gestureVelocityImpact: .6
}