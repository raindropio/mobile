import React, { useEffect } from 'react'
import { View as Loading } from 'screens/overlay/loading'

import useAuth from './auth'
import { useData } from 'modules/extension'
import useCollectionId from './collectionId'

function ExtensionInit({ navigation }) {
    const authorized = useAuth()
    const data = useData()
    const collectionId = useCollectionId()

    useEffect(()=>{
        //not autorized
        if (authorized == 'no'){
            navigation.replace('auth')
            return
        }

        //not loaded yet...
        if (authorized == 'idle') return
        if (!data) return

        //provider load failed
        if (data instanceof Error){
            navigation.replace('overlay', {
                screen: 'error',
                params: { error: data }
            })
            return
        }

        //collectionId unknown and a link
        if (data.type == 'url' && !collectionId){
            const item = data.values[0]

            navigation.replace('bookmark', {
                _id: item.link,
                new: {
                    item,
                    autoCreate: false
                },
                stackAnimation: 'fade'
            })
            return
        }

        //create or edit
        navigation.replace('create', {
            ...data,
            values: (data.values||[]).map(val=>({
                ...val,
                collectionId
            }))
        })
    }, [ data, authorized, collectionId ])

    return <Loading onCancel={navigation.goBack} />
}

ExtensionInit.options = {
    headerShown: false,
    cardStyle: {
        backgroundColor: 'transparent'
    }
}

export default ExtensionInit