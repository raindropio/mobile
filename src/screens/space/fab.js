import { useSelector } from 'react-redux'

import { Fab } from 'co/button'

export default function SpaceFab({ navigation, spaceId }) {
    const selectModeEnabled = useSelector(state=>state.bookmarks.selectMode.enabled)

    const onFabTap = ()=>
        navigation.navigate('bookmark/add', { collectionId: spaceId||-1 })

    if (selectModeEnabled)
        return null

    return (
        <Fab icon='add' onPress={onFabTap} />
    )
}