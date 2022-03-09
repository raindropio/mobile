import t from 't'
import React from 'react'
import { Platform, Linking } from 'react-native'
import { links } from 'config'

import Goto from 'co/goto'

export default class AddBookmarkHelp extends React.Component {
    state = {
        open: false
    }

    onPress = ()=>
        Linking.openURL(links.help.shareExtension[Platform.OS])

    onBrowserClose = ()=>
        this.setState({ open: false })

    render() {
        return (
            <Goto 
                last={this.props.last}
                icon='upload-2'
                color='asphalt'
                label={t.s('installExtension')}
                onPress={this.onPress} />
        )
    }
}