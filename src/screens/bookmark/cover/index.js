import t from 't'
import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash-es'
import * as bookmarksActions from 'data/actions/bookmarks'
import { makeDraftItem, makeHaveScreenshot } from 'data/selectors/bookmarks'

import {
    Wrap,
    CoversView,
    CoverView,
    CoverTap,
    CoverScreenshotView,
    CoverScreenshotText,
    coverHeight
} from './style'
import Cover from 'co/bookmarks/item/view/cover'
import useAddLinkPrompt from './addLinkPrompt'

const coverStyle = { borderRadius: 2, overflow: 'hidden' }
const keyExtractor = item=>item.link || item.type

function BookmarkCoverScreen({ navigation, route }) {
    const dispatch = useDispatch()

    const getDraftItem = useMemo(()=>makeDraftItem(), [])
    const getHaveScreenshot = useMemo(()=>makeHaveScreenshot(), [])

    const item = useSelector(state => getDraftItem(state, route.params?._id))
    const haveScreenshot = useSelector(state => getHaveScreenshot(state, route.params?._id))

    const onClose = ()=>navigation.goBack()

    const onLink = cover=>{
        let media = [...item.media]

        if (!media.some(item => item.link === cover))
            media.push({ link: cover })

        dispatch(bookmarksActions.draftChange(route.params?._id, {
            cover,
            media
        }))

        onClose()
    }

    const onScreenshot = ()=>onLink('<screenshot>')

    const [openAddLink, addLinkModal] = useAddLinkPrompt(onLink)

    const renderItem = ({ item: cover })=>{
        switch (cover.type) {
            case 'screenshot':
                return (
                    <CoverTap onPress={onScreenshot}>
                        <CoverScreenshotView>
                            <CoverScreenshotText>{_.capitalize(t.s('screenshot'))}</CoverScreenshotText>
                        </CoverScreenshotView>
                    </CoverTap>
                )
            case 'add':
                return (
                    <CoverTap onPress={openAddLink}>
                        <CoverScreenshotView>
                            <CoverScreenshotText>+</CoverScreenshotText>
                        </CoverScreenshotView>
                    </CoverTap>
                )
            default:
                return (
                    <CoverTap onPress={() => onLink(cover.link)}>
                        <CoverView active={cover.link === item.cover}>
                            <Cover
                                style={coverStyle}
                                src={cover.link}
                                width={coverHeight}
                                height={coverHeight}
                                preloader={true}
                            />
                        </CoverView>
                    </CoverTap>
                )
        }
    }

    const items = [
        ...(!haveScreenshot ? [{ type: 'screenshot' }] : []),
        ...item.media,
        { type: 'add' }
    ]

    return (
        <Wrap>
            <CoversView
                data={items}
                numColumns={3}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            />
            {addLinkModal}
        </Wrap>
    )
}

BookmarkCoverScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.shape({
        params: PropTypes.shape({
            _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        })
    }).isRequired
}

BookmarkCoverScreen.options = {
    title: t.s('cover')
}

export default BookmarkCoverScreen