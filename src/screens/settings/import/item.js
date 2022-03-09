import React from 'react'
import { Linking } from 'react-native'
import t from 't'
import { links } from 'config'

import Goto from 'co/goto'

export default class ImportItem extends React.Component {
    state = {
        open: false
    }

    onPress = ()=>
        Linking.openURL(links.help.import)

    render() {
        return (
            <Goto 
                last={this.props.last}
                label={t.s('import')}
                icon='upload-cloud'
                color='purple'
                onPress={this.onPress} />
        )
    }
}