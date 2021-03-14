import React, { useEffect } from 'react'
import t from 't'
import { mediumFade } from 'co/style/animation'

import { View as Loading, Backdrop } from 'screens/overlay/loading'
import { Wrap, Icon } from './style'

function Indicator() {
    return <Wrap><Icon /></Wrap>
}

export default function CreateLoading({ status, isNew, hideBackdrop }) {
    useEffect(()=>{
        if (isNew)
            mediumFade()
    }, [ isNew, status ])

    let message = ''
    let indicator

    if (isNew) {
        message = t.s('save')+'…'

        switch(status) {
            case 'loaded':
                indicator = Indicator;
                message = ''
            break
        }
    }

    return (
        <Backdrop transparent={hideBackdrop}>
            <Loading 
                indicator={indicator}
                message={message} />
        </Backdrop>
    )
}