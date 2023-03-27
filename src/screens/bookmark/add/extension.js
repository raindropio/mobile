import t from 't'
import { Component } from 'react';
import { Platform, Linking } from 'react-native'
import { links } from 'config'

import Goto from 'co/goto'

export default class AddBookmarkHelp extends Component {
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
                icon={Platform.select({ default: 'upload-2', android: 'share' })}
                color='asphalt'
                label={t.s('installExtension')}
                onPress={this.onPress} />
        )
    }
}