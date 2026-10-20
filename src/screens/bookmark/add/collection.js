import t from 't'
import Goto from 'co/goto'

export default function AddBookmarkCollection({ navigation, collectionId, last }) {
    const onPress = ()=>{
        navigation.goBack()

        setTimeout(()=>{
            navigation.navigate('collection/add', {
                parentId: collectionId > 0 ? collectionId : undefined,
                onSuccess: ({ _id })=>
                    navigation.navigate('space/browse', { spaceId: _id })
            })
        })
    }

    return (
        <Goto 
            last={last}
            icon='folder-add'
            color='blue'
            label={t.s(collectionId > 0 ? 'createSubFolder' : 'createNewCollection')}
            onPress={onPress} />
    )
}