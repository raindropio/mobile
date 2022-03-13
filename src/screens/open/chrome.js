import { useEffect } from 'react'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import { StackActions } from '@react-navigation/native'

import { useTheme } from 'styled-components'
import cacheUrl from './helpers/cacheUrl'
import externalUrl from './helpers/externalUrl'

export default function OpenChrome({ navigation, route: { params } }) {
    const { background } = useTheme()

    useEffect(()=>{
        (async function() {
            const { bookmark, as } = params

            let link = await externalUrl(
                as == 'cache' && bookmark.cache == 'ready' ? 
                    cacheUrl(bookmark._id) : 
                    bookmark.link
            )

            return InAppBrowser.open(link, {
                toolbarColor: background.regular,
                secondaryToolbarColor: background.alternative,
                enableUrlBarHiding: true,
                showTitle: true,
                enableDefaultShare: true,
                hasBackButton: true,
                forceCloseOnRedirection: false,
                showInRecents: true
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