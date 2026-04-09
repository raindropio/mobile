import t from 't'
import { Component } from 'react';
import { Linking } from 'react-native'
import { links } from 'config'

import Goto from 'co/goto'

export default class AddBookmarkHelp extends Component {
    state = {
        open: false
    }

    onPress = ()=>
        Linking.openURL(links.help.shareExtension)

    onBrowserClose = ()=>
        this.setState({ open: false })

    render() {
        return (
            <Goto
                last={this.props.last}
                icon='share'
                color='asphalt'
                label={t.s('installBrowserExtension')}
                onPress={this.onPress} />
        )
    }
}