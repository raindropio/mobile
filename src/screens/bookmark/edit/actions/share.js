import { useCallback } from 'react';
import t from 't'
import Goto from 'co/goto'
import share from 'co/bookmarks/item/share'

export default function BookmarkEditActionShare({ item, navigation }) {
    const onPress = useCallback(()=>{
        navigation.goBack()

        setTimeout(() => {
            share(item)
        }, 100)
    }, [item.link])

    return (
        <Goto
            label={t.s('share')}
            icon='share'
            action=''
            onPress={onPress} />
    )
}