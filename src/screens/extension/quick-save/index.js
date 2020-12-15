import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { withOverlay } from 'co/navigation/screen'

import Context from '../context'
import { Wrap } from './style'
import { ActivityIndicator } from 'co/native'

function ExtensionSave({ navigation }) {
    const provider = useContext(Context)

    const collectionId = useSelector(state=>
        state.config.add_default_collection || state.config.last_collection
    )

    useEffect(()=>{
        if (provider.type)
            navigation.replace('create', {
                ...provider,
                collectionId
            })
    }, [provider.type])

    return (
        <Wrap>
            <ActivityIndicator color='blue' />
        </Wrap>
    )
}

export default withOverlay(ExtensionSave, 280)