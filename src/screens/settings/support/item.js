import { Linking } from 'react-native'
import t from 't'
import { links } from 'config'

import Goto from 'co/goto'

export default function SupportItem({ last }) {
    const onPress = ()=>
        Linking.openURL(links.help.contact)

    return (
        <Goto 
            last={last}
            label={t.s('support')}
            icon='questionnaire'
            onPress={onPress} />
    )
}