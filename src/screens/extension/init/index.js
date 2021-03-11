import React, { useEffect } from 'react'
import { Fade } from 'co/navigation/transition'

import useAuth from './auth'
import { useData } from 'modules/extension'
import useCollectionId from './collectionId'
import useIsNew from './isNew'
import Loading from './loading'

function ExtensionInit({ route: { params={} }, navigation }) {
    const authorized = useAuth()
    const data = useData()
    const collectionId = useCollectionId(params)
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

        //collectionId unknown
        if (!collectionId){
            if (isNew == null)
                return
            else if (isNew) {
                navigation.replace('select-collection')
                return
            }
        }

        //create or edit
        navigation.replace('create', {
            ...data,
            values: (data.values||[]).map(val=>({
                ...val,
                collectionId
            }))
        })
    }, [ data, authorized, collectionId, isNew ])

    return <Loading />
}

ExtensionInit.options = {
    ...Fade,
    headerShown: false,
    cardStyle: {
        backgroundColor: 'transparent'
    }
}

export default ExtensionInit