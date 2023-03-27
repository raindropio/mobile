import { useEffect, useCallback } from 'react';
import t from 't'
import { mediumFade } from 'co/style/animation'

import { View as Loading, Backdrop } from 'screens/overlay/loading'
import { Wrap } from './style'
import Icon from 'co/icon'

function Indicator() {
    return <Wrap><Icon name='checkbox' variant='fill' color='accent' /></Wrap>
}

export default function CreateLoading({ status, isNew, transparent, navigation }) {
    useEffect(()=>{
        if (isNew)
            mediumFade()
    }, [ isNew, status ])

    const onCancel = useCallback(()=>{
        navigation.setParams({ cancel: true })
    }, [navigation])

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
        <Backdrop transparent={transparent}>
            <Loading 
                indicator={indicator}
                message={message}
                onCancel={onCancel} />
        </Backdrop>
    )
}