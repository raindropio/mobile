import * as React from 'react'
import { Platform } from 'react-native'

import { ButtonWrap } from '../header/buttons/style'
import Icon from 'co/icon'

const iosBackIconStyle = {marginLeft:-10}

export default {
    //header
    headerBackTitle: ' ', 
    headerBackImage: Platform.select({
        ios: ()=>(
            <ButtonWrap>
                <Icon 
                    name='arrow-left-s'
                    size='32'
                    color='text.secondary'
                    style={iosBackIconStyle} />
            </ButtonWrap>
        ),
        android: ()=>(
            <ButtonWrap>
                <Icon 
                    name='arrow-left'
                    color='text.secondary' />
            </ButtonWrap>
        )
    }),
    headerStyle: {
        shadowOpacity: 1
    },

    //activities
    cardOverlayEnabled: true,
    detachInactiveScreens: true,
    gestureVelocityImpact: .6
}