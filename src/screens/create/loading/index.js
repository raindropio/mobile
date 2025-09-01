import { useCallback } from 'react';

import { Backdrop, Text } from './style'
import { ActivityIndicator } from 'co/native'

export default function CreateLoading({ status, transparent, navigation }) {
    const onCancel = useCallback(()=>{
        navigation.setParams({ cancel: true })
    }, [navigation])

    return (
        <Backdrop>
            <ActivityIndicator />
            <Text>{status == 'loading' || status == 'saving' ? 'Saving...' : 'Saved!'}</Text>
        </Backdrop>
    )
}