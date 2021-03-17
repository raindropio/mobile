import React from 'react'
import t from 't'
import { links } from 'config'

import Goto from 'co/goto'
import Browser from 'modules/browser'

export default class DesktopItem extends React.Component {
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
                    label={'Web '+t.s('und')+' '+t.s('pro_desktop')}
                    icon='app-store'
                    onPress={this.onPress} />

                {this.state.open && (
					<Browser
						link={links.help.desktopApp}
                        fromBottom
						onClose={this.onBrowserClose} />
				)}
            </>
        )
    }
}