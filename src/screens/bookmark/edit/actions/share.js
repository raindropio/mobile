import t from 't'
import Goto from 'co/goto'
import share from 'co/bookmarks/item/share'

export default function BookmarkEditActionShare({ item, navigation }) {
    const onPress = ()=>{
        navigation.goBack()

        setTimeout(() => {
            share(item)
        }, 100)
    }

    return (
        <Goto
            label={t.s('share')}
            icon='share'
            action=''
            onPress={onPress} />
    )
}