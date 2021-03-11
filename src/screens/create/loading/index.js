import React from 'react'
import t from 't'

import { View as Loading, Backdrop } from 'screens/overlay/loading'
import { DoneIcon } from './style'

export default function CreateLoading({ status }) {
    let message = ''
    let indicator

    switch(status) {
        case 'saving': message = t.s('newBookmark')+'…'; break
        case 'loading': message = t.s('loading')+'…'; break
        case 'loaded': indicator = DoneIcon; break
    }

    return (
        <Backdrop>
            <Loading 
                indicator={indicator}
                message={message} />
        </Backdrop>
    )
}