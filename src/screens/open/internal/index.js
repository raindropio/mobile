import { useMemo } from 'react';
import Tint from 'co/collections/item/tint'

import { Wrap } from './style'
import WebView from './webview'
import Footer from './footer'

function OpenInternal({ route: { params }, navigation }) {
    const { bookmark } = params

    const view = useMemo(()=>{
        if (params.view)    return params.view
        switch(bookmark.type) {
            case 'article':
            case 'book':    
                return 'article'

            case 'link':
                return 'web'

            default:
                return 'embed'
        }
    }, [bookmark])

    return (
        <Wrap>
            <Tint _id={bookmark.collectionId}>
                <WebView {...params} view={view} navigation={navigation} />
                <Footer {...params} view={view} navigation={navigation} />
            </Tint>
        </Wrap>
    )
}

OpenInternal.options = {
    headerShown: false
}

export default OpenInternal