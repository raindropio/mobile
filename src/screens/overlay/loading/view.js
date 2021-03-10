import React from 'react'
import { ActivityIndicator } from 'co/native'
import { Window, Element, Message } from './view.style'

function OverlayLoadingView({ message }) {
    return (
        <Window>
            <Element>
                <ActivityIndicator />
                <Message>{message}</Message>
            </Element>
        </Window>
    )
}

export default OverlayLoadingView