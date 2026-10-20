import { Linking } from 'react-native'
import t from 't'
import { links } from 'config'

import Goto from 'co/goto'

export default function DesktopItem({ last }) {
    const onPress = ()=>
        Linking.openURL(links.help.desktopApp)

    return (
        <Goto
            last={last}
            label={t.s('webAndDesktopApp')}
            icon='app-store'
            onPress={onPress} />
    )
}