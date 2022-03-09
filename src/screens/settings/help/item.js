import React from 'react'
import { Linking } from 'react-native'
import t from 't'
import { links } from 'config'

import Goto from 'co/goto'

export default class HelpItem extends React.Component {
    state = {
        open: false
    }

    onPress = ()=>
        Linking.openURL(links.help.mobile)

    render() {
        return (
            <Goto 
                last={this.props.last}
                label={t.s('help')}
                icon='question'
                onPress={this.onPress} />
        )
    }
}