import t from 't'
import { Platform, Linking, Alert } from 'react-native'

import { openFileUrl } from 'modules/native'
import externalUrl from 'modules/format/url/external'

export default async function SystemBrowser({ bookmark }) {
    try {
        const link = await externalUrl(bookmark.link)
        const { fileType } = bookmark

        //open files on android in a specific way
        if (Platform.OS == 'android' && fileType)
            return openFileUrl(link, fileType == 'auto' ? '' : fileType)

        return Linking.openURL(link)
    } catch(e) {
        Alert.alert(t.s('error'), e.toString())
    }
}