import React from 'react'
import { View as Loading, Backdrop } from 'screens/overlay/loading'

export default function ExtensionInitLoading() {
    return (
        <Backdrop>
            <Loading />
        </Backdrop>
    )
}