import t from 't'
import { Linking } from 'react-native'
import { links } from 'config'

import Goto from 'co/goto'

export default function AddBookmarkHelp({ last }) {
    const onPress = ()=>
        Linking.openURL(links.help.shareExtension)

    return (
        <Goto
            last={last}
            icon='share'
            color='asphalt'
            label={t.s('installBrowserExtension')}
            onPress={onPress} />
    )
}