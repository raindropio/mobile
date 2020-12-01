import React from 'react'
import t from 't'
import Goto from 'co/goto'
import Browser from 'co/navigation/browser'

export default class SupportItem extends React.Component {
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
                    label={t.s('support')}
                    icon='questionnaire'
                    onPress={this.onPress} />

                {this.state.open && (
					<Browser
						link='https://help.raindrop.io/contact'
                        fromBottom
						onClose={this.onBrowserClose} />
				)}
            </>
        )
    }
}