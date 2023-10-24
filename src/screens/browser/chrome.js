import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import externalUrl from 'modules/format/url/external'
import system from './system'

export default async function ChromeBrowser({ bookmark }) {
    try {
        let link = await externalUrl(bookmark.link)

        return InAppBrowser.open(link, {
            enableUrlBarHiding: true,
            showTitle: true,
            enableDefaultShare: true,
            hasBackButton: true,
            forceCloseOnRedirection: false,
            showInRecents: true
        })
    } catch(e) {
        return system({bookmark})
    }
}