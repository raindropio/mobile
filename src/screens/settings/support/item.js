import { Component } from 'react';
import { Linking } from 'react-native'
import t from 't'
import { links } from 'config'

import Goto from 'co/goto'

export default class SupportItem extends Component {
    onPress = ()=>
        Linking.openURL(links.help.contact)

    render() {
        return (
            <Goto 
                last={this.props.last}
                label={t.s('support')}
                icon='questionnaire'
                onPress={this.onPress} />
        )
    }
}