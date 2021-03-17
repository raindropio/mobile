import t from 't'
import React from 'react'
import { Platform } from 'react-native'
import { links } from 'config'

import Goto from 'co/goto'
import Browser from 'modules/browser'

export default class AddBookmarkHelp extends React.Component {
    state = {
        open: false
    }

    onPress = ()=>
        this.setState({ open: true })

    onBrowserClose = ()=>
        this.setState({ open: false })

    render() {
        return (
            <>
                <Goto 
                    last={this.props.last}
                    icon='upload-2'
                    color='asphalt'
                    label={t.s('installExtension')}
                    onPress={this.onPress} />

                {this.state.open && (
					<Browser
						link={links.help.shareExtension[Platform.OS]}
                        fromBottom
						onClose={this.onBrowserClose} />
				)}
            </>
        )
    }
}