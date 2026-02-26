import { Component } from 'react';
import { Linking } from 'react-native'
import t from 't'
import { links } from 'config'

import Goto from 'co/goto'

export default class BlogItem extends Component {
    state = {
        open: false
    }

    onPress = ()=>
        Linking.openURL(links.blog)

    render() {
        return (
            <Goto 
                last={this.props.last}
                label={t.s('blog')}
                icon='stack'
                onPress={this.onPress} />
        )
    }
}