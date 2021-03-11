import React, { useEffect } from 'react'
import t from 't'
import { mediumFade } from 'co/style/animation'

import { View as Loading, Backdrop } from 'screens/overlay/loading'
import { Wrap, Icon } from './style'

function Indicator() {
    return <Wrap><Icon /></Wrap>
}

export default function CreateLoading({ status, isNew }) {
    useEffect(()=>{mediumFade()}, [ isNew, status ])

    let message = ''
    let indicator

    switch(status) {
        case 'loaded': 
            indicator = Indicator;
            message = ''
        break

        default:
            if (isNew)
                message = t.s('save')+'…'
        break
    }

    return (
        <Backdrop>
            <Loading 
                indicator={indicator}
                message={message} />
        </Backdrop>
    )
}