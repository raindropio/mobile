import React, { useContext, useEffect } from 'react'
import { withOverlay } from 'co/navigation/screen'

import Context from '../context'
import { Wrap } from './style'
import { ActivityIndicator } from 'co/native'

function ExtensionSave({ navigation }) {
    const provider = useContext(Context)

    useEffect(()=>{
        if (provider.type)
            navigation.replace('create', provider)
    }, [provider.type])

    return (
        <Wrap>
            <ActivityIndicator size='large' />
        </Wrap>
    )
}

export default withOverlay(ExtensionSave, 280)