import { useEffect, useCallback } from 'react';
import t from 't'
import { mediumFade } from 'co/style/animation'

import { Backdrop } from './style'
import { ActivityIndicator } from 'co/native'

export default function CreateLoading({ status, isNew, transparent, navigation }) {
    useEffect(()=>{
        if (isNew)
            mediumFade()
    }, [ isNew, status ])

    const onCancel = useCallback(()=>{
        navigation.setParams({ cancel: true })
    }, [navigation])

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
        <Backdrop>
            <ActivityIndicator />
        </Backdrop>
    )
}