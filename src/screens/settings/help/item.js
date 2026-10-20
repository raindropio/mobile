import { Linking } from 'react-native'
import t from 't'
import { links } from 'config'

import Goto from 'co/goto'

export default function HelpItem({ last }) {
    const onPress = ()=>
        Linking.openURL(links.help.index)

    return (
        <Goto 
            last={last}
            label={t.s('help')}
            icon='question'
            onPress={onPress} />
    )
}