import t from 't'
import { Clipboard } from 'react-native'

import Goto from 'co/goto'

export default function BookmarkEditActionCopy({ item: { link }, navigation }) {
    const onPress = ()=>{
        Clipboard.setString(link)
        navigation.goBack()
    }

    return (
        <Goto 
            label={t.s('copyLinkToClipboard')}
            icon='file-copy'
            action=''
            onPress={onPress} />
    )
}