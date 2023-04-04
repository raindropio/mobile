import { useEffect } from 'react';
import { useSelector } from 'react-redux'

import useAuth from './auth'
import { useData } from 'modules/extension'

function ExtensionInit({ navigation }) {
    const authorized = useAuth()
    const data = useData()

    //auto save and collectionId
    const { mobile_add_auto_save, add_default_collection, last_collection } = useSelector(state=>state.config)
    const collectionId = add_default_collection || last_collection

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

        //show edit screen right away for link and when auto save is off
        if (data.type == 'url' && !mobile_add_auto_save){
            const item = data.values[0]

            navigation.replace('bookmark', {
                _id: item.link,
                new: {
                    item: {
                        ...item,
                        collectionId
                    },
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
            })),
            transparent: true
        })
    }, [ data, authorized, collectionId ])

    return null
}

ExtensionInit.options = {
    headerShown: false
}

export default ExtensionInit