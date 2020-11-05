import * as React from 'react'
import { Dimensions } from 'react-native'

import { ButtonWrap } from '../header/buttons/style'
import Icon from 'co/icon'

export default {
    //header
    headerBackTitleVisible: false, 
    headerBackImage: ()=>(
        <ButtonWrap>
            <Icon 
                name='arrow-left'
                color='accent' />
        </ButtonWrap>
    ),
    headerStyle: {
        shadowOpacity: 1
    },

    //activities
    cardOverlayEnabled: true,
    detachInactiveScreens: true,

    //gestures
    gestureVelocityImpact: 0.1,
    gestureResponseDistance: {
        horizontal: Math.min(Dimensions.get('screen').width, Dimensions.get('screen').height),
        vertical: 135
    }
}