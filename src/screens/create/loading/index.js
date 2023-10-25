import { useCallback } from 'react';

import { Backdrop } from './style'
import { ActivityIndicator } from 'co/native'

export default function CreateLoading({ status, isNew, transparent, navigation }) {
    const onCancel = useCallback(()=>{
        navigation.setParams({ cancel: true })
    }, [navigation])

    return (
        <Backdrop>
            <ActivityIndicator />
        </Backdrop>
    )
}