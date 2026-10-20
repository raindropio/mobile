import { Wrap } from './style'
import WebView from './webview'
import Footer from './footer'

function getView({ view, bookmark }) {
    if (view)   return view
    switch(bookmark.type) {
        case 'article':
        case 'book':
            return 'article'

        case 'link':
            return 'web'

        default:
            return 'embed'
    }
}

function OpenInternal({ route: { params }, navigation }) {
    const view = getView(params)

    return (
        <Wrap>
            <WebView {...params} view={view} navigation={navigation} />
            <Footer {...params} view={view} navigation={navigation} />
        </Wrap>
    )
}

OpenInternal.options = {
    headerShown: false
}

export default OpenInternal