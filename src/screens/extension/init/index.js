import React, { useEffect } from 'react'

import useAuth from './auth'
import { useData } from 'modules/extension'
import useCollectionId from './collectionId'
import useIsNew from './isNew'
import Loading from './loading'

function ExtensionInit({ navigation }) {
    const authorized = useAuth()
    const data = useData()
    const collectionId = useCollectionId()
    const isNew = useIsNew(data)

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

        const params = {
            ...data,
            values: (data.values||[]).map(val=>({
                ...val,
                collectionId
            }))
        }

        //collectionId unknown
        if (!collectionId){
            if (isNew == null)
                return
            else if (isNew) {
                navigation.replace('select-collection', params)
                return
            }
        }

        //create or edit
        navigation.replace('create', params)
    }, [ data, authorized, collectionId, isNew ])

    return <Loading />
}

ExtensionInit.options = {
    headerShown: false,
    cardStyle: {
        backgroundColor: 'transparent'
    }
}

export default ExtensionInit