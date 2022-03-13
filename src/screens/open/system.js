import { useEffect } from 'react'
import t from 't'
import { Platform, Linking, Alert } from 'react-native'

import { openFileUrl } from 'modules/native'
import cacheUrl from './helpers/cacheUrl'
import externalUrl from './helpers/externalUrl'

export default function OpenSystem({ navigation, route: { params: { bookmark, as } } }) {
    useEffect(()=>{
        (async function() {
            const link = await externalUrl(
                as == 'cache' && bookmark.cache == 'ready' ? 
                    cacheUrl(bookmark._id) : 
                    bookmark.link
            )
            const { fileType } = bookmark

            //open files on android in a specific way
            if (Platform.OS == 'android' && fileType)
                return openFileUrl(link, fileType == 'auto' ? '' : fileType)

            return Linking.openURL(link)
        })()
            .then(navigation.pop)
            .catch(e=>{
                Alert.alert(t.s('error'), e.toString())
                navigation.pop()
            })
    }, [])

    return null
}