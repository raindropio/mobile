import { useCallback, useMemo, useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { KeyboardAvoidingView } from 'react-native'
import { WebView } from 'co/native'
import PropTypes from 'prop-types'
import { links } from 'config'
import { refresh as refreshUser } from 'data/actions/user'
import { refresh as refreshCollections } from 'data/actions/collections'
import { oneLoad } from 'data/actions/bookmarks'
import * as bookmarkSelectors from 'data/selectors/bookmarks'
import * as browser from 'screens/browser'

const wrapStyle = { flex: 1 }

function Ask({ navigation, route }) {
	const webViewRef = useRef(null)
	const dispatch = useDispatch()
	const { raindropId } = route.params || {}

    const [browseId, setBrowseId] = useState(undefined)
    const browseBookmark = useSelector(state => browseId ? bookmarkSelectors.bookmark(state, browseId) : null)

	const source = useMemo(()=>{
		const params = new URLSearchParams({ closable: 'true' })
		if (raindropId)
			params.set('raindropId', String(raindropId))
		return {
            uri: links.stella + '?' + params.toString()
        }
	}, [raindropId])

	const onMessage = useCallback(({ nativeEvent })=>{
        let data
		try { data = JSON.parse(nativeEvent.data) }
        catch(e) { console.error(e) }
        
        if (typeof data != 'object' || typeof data.type != 'string') return

        switch(data.type) {
            case 'close':
                navigation.goBack()
                break

            case 'tool-called':
                dispatch(refreshUser())
                dispatch(refreshCollections())
                break

            case 'link-click':
                if (data.raindropId)
                    navigation.navigate('bookmark/edit', { _id: data.raindropId })
                else if (data.collectionId)
                    navigation.navigate('space/browse', { spaceId: data.collectionId })
                else if (data.tag)
                    navigation.navigate('space/browse', { spaceId: 0, tag: data.tag })
                break
        }
	}, [navigation, dispatch])

	const onLoad = useCallback(()=>{
        //autofocus on load
		webViewRef.current?.requestFocus()
	}, [webViewRef.current])

	const onShouldStartLoadWithRequest = useCallback(({ url })=>{
        //click on raindrop link
		const match = url.match(/\/raindrop\/(\d+)\/link/)
		if (match) {
            const bookmarkId = parseInt(match[1])
            dispatch(oneLoad(bookmarkId))
            setBrowseId(bookmarkId)
			return false
		}
		return true
	}, [setBrowseId, dispatch])

    //open bookmark in internal browser when link is clicked and loaded
    useEffect(()=>{
        if (!browseBookmark?.link) return
        browser.auto({ navigation, bookmark: browseBookmark })
        setBrowseId(undefined)
    }, [navigation, browseBookmark?.link])

	return (
        <KeyboardAvoidingView behavior='height' style={wrapStyle}>
            <WebView
                ref={webViewRef}
                overScrollMode='content'
                keyboardDisplayRequiresUserAction={false}
                source={source}
                onMessage={onMessage}
                onLoad={onLoad}
                onShouldStartLoadWithRequest={onShouldStartLoadWithRequest} />
        </KeyboardAvoidingView>
	)
}

Ask.options = {
	headerShown: false
}

Ask.propTypes = {
    route:  PropTypes.shape({
        params: PropTypes.shape({
            raindropId: PropTypes.number //optional
        })
    })
}

export default Ask