import t from 't'
import React, { useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash-es'
import * as bookmarksActions from 'data/actions/bookmarks'
import { makeDraftItem, makeHaveScreenshot } from 'data/selectors/bookmarks'
import prompt from 'react-native-prompt-android'

import {
    CoversView,
    CoverView,
    CoverTap,
    CoverScreenshotView,
    CoverScreenshotText,
    coverHeight
} from './style';
import Cover from 'co/bookmarks/item/view/cover';

const coverStyle = { borderRadius: 2, overflow: 'hidden' };

const BookmarkCoverScreen = ({ navigation, route }) => {
    const dispatch = useDispatch()

    const getDraftItem = useMemo(()=>makeDraftItem(), [])
    const getHaveScreenshot = useMemo(()=>makeHaveScreenshot(), [])

    const item = useSelector(state => getDraftItem(state, route.params?._id))
    const haveScreenshot = useSelector(state => getHaveScreenshot(state, route.params?._id))

    const onClose = useCallback(() => navigation.goBack(), [navigation])

    const onLink = useCallback(
        (cover) => {
            let media = [...item.media]

            if (!media.some(item => item.link === cover))
                media.push({ link: cover })

            dispatch(bookmarksActions.draftChange(route.params?._id, {
                cover,
                media
            }))

            onClose()
        },
        [item.media, route.params?._id, dispatch, onClose]
    )

    const onScreenshot = useCallback(() => {
        onLink('<screenshot>')
    }, [onLink])

    const onAdd = useCallback(() => {
        prompt(
            t.s('add') + ' ' + t.s('cover').toLowerCase(),
            t.s('enterLink'),
            [
                { text: t.s('cancel'), style: 'cancel' },
                { text: t.s('add'), onPress: onLink }
            ],
            { placeholder: 'https://'}
        );
    }, [onLink])

    const keyExtractor = useCallback(item => item.link || item.type, [])

    const renderItem = useCallback(({ item: cover }) => {
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
                    <CoverTap onPress={onAdd}>
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
                                height={coverHeight}
                                preloader={true}
                            />
                        </CoverView>
                    </CoverTap>
                )
        }
    }, [onScreenshot, onAdd, onLink])

    const items = useMemo(()=>[
		...(!haveScreenshot ? [{ type: 'screenshot' }] : []),
		...item.media,
		{ type: 'add' }
	], [haveScreenshot, item.media])

    return (
        <CoversView
            data={items}
            numColumns={3}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
        />
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