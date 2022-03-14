import { useEffect } from 'react'
import t from 't'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import { Alert, Linking } from 'react-native'

import { useTheme } from 'styled-components'
import externalUrl from './helpers/externalUrl'

export default function OpenSafari({ navigation, route: { params } }) {
    const { bookmark, presentation } = params
    const { dark, color } = useTheme()

    let link = bookmark.link

    //clean up url if possible
    try{
        const url = new URL(link)
        if ((url.hash.match(/#/g) || []).length>1)
            url.hash = ''
        link = url.href
    }catch(e){}

    useEffect(()=>{
        (async function() {
            //close earlier, otherwise buggy on ios
            navigation.pop()

            return InAppBrowser.open(
                await externalUrl(link),
                {
                    dismissButtonStyle: 'close',
                    modalEnabled: (presentation != 'push'),
                    modalPresentationStyle: 'fullScreen',
                    animated: true,
                    preferredBarTintColor: dark ? 'black' : 'white',
                    preferredControlTintColor: color.accent,
                    enableBarCollapsing: (presentation == 'push')
                }
            )
        })()
            .catch(()=>Linking.openURL(params.bookmark.link))
            .catch(e=>{
                Alert.alert(t.s('error'), e.toString())
            })
    }, [])

    return null
}