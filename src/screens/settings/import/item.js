import { Linking } from 'react-native'
import t from 't'
import { links } from 'config'

import Goto from 'co/goto'

export default function ImportItem({ last }) {
    const onPress = ()=>
        Linking.openURL(links.help.import)

    return (
        <Goto 
            last={last}
            label={t.s('import')}
            icon='upload-cloud'
            color='purple'
            onPress={onPress} />
    )
}