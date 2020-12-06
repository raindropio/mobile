import * as React from 'react'
import { Platform } from 'react-native'
import { Wrap, Body, Backdrop } from './style'

export function withOverlay(Component, height=280) {
    function ScreenWithOverlay(props) {
        return (
            <Wrap>
                <Backdrop onPressIn={props.navigation.goBack} />

                <Body height={height}>
                    <Component {...props} />
                </Body>
            </Wrap>
        )
    }

    ScreenWithOverlay.options = {
        ...Platform.select({
            android: {
                stackPresentation: 'transparentModal',
                stackAnimation: 'fade'
            }
        }),
        animationEnabled: false,
        headerShown: false,
        cardStyle: {
            backgroundColor: 'transparent'
        },
        contentStyle: {
            backgroundColor: 'transparent'
        }
    }

    return ScreenWithOverlay
}