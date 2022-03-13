import { useEffect } from 'react'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import { StackActions } from '@react-navigation/native'

import { useTheme } from 'styled-components'
import cacheUrl from './helpers/cacheUrl'
import externalUrl from './helpers/externalUrl'

export default function OpenSafari({ navigation, route: { params } }) {
    const { dark, color } = useTheme()

    useEffect(()=>{
        (async function() {
            const { bookmark, as } = params

            let link = await externalUrl(
                as == 'cache' && bookmark.cache == 'ready' ? 
                    cacheUrl(bookmark._id) : 
                    bookmark.link
            )

            //clean up url if possible
            try{
                const url = new URL(link)
                if ((url.hash.match(/#/g) || []).length>1)
                    url.hash = ''
                link = url.href
            }catch(e){}

            return InAppBrowser.open(link, {
                dismissButtonStyle: 'close',
                modalEnabled: false,
                animated: true,
                preferredBarTintColor: dark ? 'black' : 'white',
                preferredControlTintColor: color.accent,
                enableBarCollapsing: true
            })
        })()
            .then(()=>{navigation.pop()})
            .catch(()=>{
                //if InAppBrowser fail try again with system browser
                navigation.dispatch(StackActions.replace('system', params))
            })
    }, [])

    return null
}