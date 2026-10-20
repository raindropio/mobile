import { Linking } from 'react-native'
import t from 't'
import { links } from 'config'

import Goto from 'co/goto'

export default function BlogItem({ last }) {
    const onPress = ()=>
        Linking.openURL(links.blog)

    return (
        <Goto 
            last={last}
            label={t.s('blog')}
            icon='stack'
            onPress={onPress} />
    )
}