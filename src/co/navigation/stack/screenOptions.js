import * as React from 'react'

import { ButtonWrap } from '../header/buttons/style'
import Icon from 'co/icon'

export default {
    //header
    headerBackTitle: ' ', 
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
    gestureVelocityImpact: .6
}