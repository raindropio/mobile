import React from 'react'
import { Modal } from 'react-native'
import Height from 'co/navigation/height'

import { Backdrop } from './style'
import View from './view'

function Screen({ route: { params={} }, navigation }) {
    return (
        <>
            <Height height={300} />
            <View onCancel={navigation.goBack} {...params} />
        </>
    )
}

Screen.options = {
    presentation: 'transparentModal',
    cardShadowEnabled: false,
    cardOverlayEnabled: false
}

export { Screen }

export function Component(props) {
    return (
        <Modal
            transparent
            visible
            animationType='fade'>
            <Backdrop>
                <View {...props} />
            </Backdrop>
        </Modal>
    )
}

export { View, Backdrop }