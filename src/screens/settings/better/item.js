import React from 'react'
import t from 't'
import Goto from 'co/common/goto'
import Browser from 'co/navigation/browser'

export default class BetterItem extends React.Component {
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
                    label={t.s('pro_nextFeatures')}
                    icon='stack'
                    onPress={this.onPress} />

                {this.state.open && (
					<Browser
						link='https://raindropio.canny.io/feature-requests'
                        fromBottom
						onClose={this.onBrowserClose} />
				)}
            </>
        )
    }
}