import { Component } from 'react';
import { Linking } from 'react-native'
import t from 't'
import { links } from 'config'

import Goto from 'co/goto'

export default class DesktopItem extends Component {
    state = {
        open: false
    }

    onPress = ()=>
        Linking.openURL(links.help.desktopApp)

    render() {
        return (
            <Goto 
                last={this.props.last}
                label={'Web '+t.s('und')+' '+t.s('pro_desktop')}
                icon='app-store'
                onPress={this.onPress} />
        )
    }
}