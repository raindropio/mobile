import t from 't'
import Goto from 'co/goto'

export default function EditBookmarkCache({ item, navigation }) {
    if (item.cache != 'ready')
        return null

    const onPress = ()=>
        navigation.replace('browser/internal', { bookmark: item, view: 'cache' })

    return (
        <Goto 
            icon='file-history'
            action=''
            onPress={onPress}
            label={t.s('openWebArchive')} />
    )
}