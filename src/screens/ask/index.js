import { useRef } from 'react'
import { useDispatch, useStore } from 'react-redux'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'
import { WebView } from 'co/native'
import PropTypes from 'prop-types'
import { links } from 'config'
import { refresh as refreshUser } from 'data/actions/user'
import { refresh as refreshCollections } from 'data/actions/collections'
import { oneLoad } from 'data/actions/bookmarks'
import { bookmark as getBookmark } from 'data/selectors/bookmarks'
import * as browser from 'screens/browser'

const wrapStyle = { flex: 1 }

function Ask({ navigation, route }) {
    const webViewRef = useRef(null)
    const dispatch = useDispatch()
    const store = useStore()
    const { raindropId } = route.params || {}

    const params = new URLSearchParams({ closable: 'true' })
    if (raindropId)
        params.set('raindropId', String(raindropId))
    const source = {
        uri: links.stella + '?' + params.toString()
    }

    const onMessage = ({ nativeEvent })=>{
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
    }

    const onLoad = ()=>{
        //autofocus on load
        webViewRef.current?.requestFocus()
    }

    //open bookmark in internal browser when link is clicked and loaded
    const openBookmark = (bookmarkId)=>{
        const cached = getBookmark(store.getState(), bookmarkId)

        if (cached.link) {
            dispatch(oneLoad(bookmarkId))
            browser.auto({ navigation, bookmark: cached })
        } else
            dispatch(oneLoad(bookmarkId, ()=>
                browser.auto({ navigation, bookmark: getBookmark(store.getState(), bookmarkId) })
            ))
    }

    const onShouldStartLoadWithRequest = ({ url })=>{
        //click on raindrop link
        const match = url.match(/\/raindrop\/(\d+)\/link/)
        if (match) {
            openBookmark(parseInt(match[1]))
            return false
        }
        return true
    }

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