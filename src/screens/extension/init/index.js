import t from 't'
import { useEffect } from 'react'
import { Alert } from 'react-native'
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
            navigation.replace('extension/auth')
            return
        }

        //not loaded yet...
        if (authorized == 'idle') return
        if (!data) return

        //provider load failed
        if (data instanceof Error){
            Alert.alert(
                t.s('error'), 
                data?.message, 
                [{ text: 'OK', style: 'cancel', onPress: ()=>navigation.goBack() }],
                {
                    cancelable: true,
                    onDismiss: ()=>navigation.goBack()
                }
            )
            return
        }

        //show edit screen right away for link and when auto save is off
        if (data.type == 'url' && !mobile_add_auto_save){
            const item = data.values[0]

            navigation.replace('bookmark/edit', {
                _id: item.link,
                new: {
                    item: {
                        ...item,
                        collectionId
                    },
                    autoCreate: false
                },
                animation: 'fade_from_bottom'
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

    return null
}

ExtensionInit.options = {
    headerShown: false,
    presentation: 'transparentModal',
    animation: 'none',
    animationTypeForReplace: 'push',
    contentStyle: {
        opacity: 0,
        backgroundColor: 'transparent'
    }
}

export default ExtensionInit