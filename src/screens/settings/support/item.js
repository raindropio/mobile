import React from 'react'
import { Linking } from 'react-native'
import t from 't'
import Goto from 'co/goto'

export default class SupportItem extends React.Component {
    onPress = ()=>
        Linking.openURL('https://help.raindrop.io/contact')

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