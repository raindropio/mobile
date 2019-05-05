import t from 't'
import React from 'react'
import { Platform } from 'react-native'
import Goto from 'co/common/goto'
import { openURL } from 'modules/browser'

export default class AddBookmarkHelp extends React.Component {
    onPress = ()=>{
        openURL({
            readerMode: true,
            link: Platform.OS == 'ios' ? 
                    'https://raindrop.helpscoutdocs.com/article/25-add-bookmark-ios' :
                    'https://raindrop.helpscoutdocs.com/article/26-add-bookmark-android'
        })
    }

    render() {
        return (
            <Goto 
                last={this.props.last}
                icon={require('assets/images/share.png')}
                label={t.s('installExtension')+'…'}
                onPress={this.onPress} />
        )
    }
}