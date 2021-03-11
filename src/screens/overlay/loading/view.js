import React from 'react'
import { ActivityIndicator } from 'co/native'
import { Window, Element, Message } from './view.style'

function OverlayLoadingView({ message, indicator }) {
    let Indicator = indicator ? indicator : ActivityIndicator

    return (
        <Window>
            <Element>
                <Indicator />
                {!!message && <Message>{message}</Message>}
            </Element>
        </Window>
    )
}

export default OverlayLoadingView