import CollectionPath from 'co/collections/path'

export default function EditBookmarkPath({ _id=0, last=false, item: { collectionId }, navigation }) {
    const onPress = ()=>
        navigation.navigate('bookmark/path', { _id, autoCommit: false })

    return (
        <CollectionPath 
            last={last}
            _id={collectionId}
            onPress={onPress} />
    )
}