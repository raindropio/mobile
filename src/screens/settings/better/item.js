import React from 'react'
import { Linking } from 'react-native'
import t from 't'
import { links } from 'config'

import Goto from 'co/goto'

export default class BetterItem extends React.Component {
    state = {
        open: false
    }

    onPress = ()=>
        Linking.openURL(links.better)

    render() {
        return (
            <Goto 
                last={this.props.last}
                label={t.s('pro_nextFeatures')}
                icon='stack'
                onPress={this.onPress} />
        )
    }
}