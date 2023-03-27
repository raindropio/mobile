import { useCallback } from 'react';
import t from 't'
import Clipboard from '@react-native-community/clipboard'

import Goto from 'co/goto'

export default function BookmarkEditActionCopy({ item: { link }, navigation }) {
    const onPress = useCallback(()=>{
        Clipboard.setString(link)
        navigation.goBack()
    }, [link])

    return (
        <Goto 
            label={t.s('copyLinkToClipboard')}
            icon='file-copy'
            action=''
            onPress={onPress} />
    )
}