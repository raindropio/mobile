import { useSelector } from 'react-redux'
import { highlights as getHighlights } from 'data/selectors/bookmarks'
import system from '../system'

import shareBookmark from 'co/bookmarks/item/share'
import Button from 'co/button'
import { Toolbar } from './style'

export default function OpenInternalFooter({ navigation, bookmark, view }) {
    const highlights = useSelector(state=>getHighlights(state, bookmark._id))

    const onBack = ()=>
        navigation.pop()

    const onFont = ()=>
        navigation.navigate('browser/font')

    const onHighlights = ()=>
        navigation.navigate('bookmark/highlights', { _id: bookmark._id })

    const onShare = ()=>
        shareBookmark(bookmark)

    const onAsk = ()=>
        navigation.navigate('ask', { raindropId: bookmark._id })

    const onOpen = ()=>
        system({ bookmark })

    const onEdit = ()=>
        navigation.navigate('bookmark/edit', { _id: bookmark._id })

    return (
        <Toolbar>
            <Button
                icon='arrow-left'
                color='text.secondary'
                onPress={onBack} />

            {view == 'article' ? (
                <Button
                    icon='font-size'
                    onPress={onFont} />
            ) : null}

            <Button
                badge={highlights.length}
                icon='markup'
                onPress={onHighlights} />

            <Button
                icon='share'
                onPress={onShare} />

            <Button
                icon='bard'
                onPress={onAsk} />

            <Button
                icon='chrome'
                onPress={onOpen} />

            <Button
                icon='more'
                onPress={onEdit} />
        </Toolbar>
    )
}