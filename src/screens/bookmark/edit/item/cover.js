import { Tap } from './cover.style'
import Cover from 'co/bookmarks/item/view/cover'
import { constants } from 'co/bookmarks/item/view/style'
import getScreenshotUrl from 'data/modules/format/screenshot'

export default function BookmarkEditCover({ _id=0, item: { cover, link, domain }, navigation }) {
    const onPress = ()=>
        navigation.navigate('bookmark/cover', { _id })

    return (
        <Tap onPress={onPress}>
            <Cover
                src={cover == '<screenshot>' ? getScreenshotUrl(link) : cover}
                link={link}
                domain={domain}
                width={constants.list.coverWidth}
                height={constants.list.coverHeight} />
        </Tap>
    )
}