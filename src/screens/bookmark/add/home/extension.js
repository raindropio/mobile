import t from 't'
import React from 'react'
import { Platform } from 'react-native'
import Goto from 'co/common/goto'
import Browser from 'co/navigation/browser'

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
                    icon='share-forward-box'
                    color='asphalt'
                    label={t.s('installExtension')}
                    onPress={this.onPress} />

                {this.state.open && (
					<Browser
						link={Platform.OS == 'ios' ? 
                            'https://help.raindrop.io/article/25-add-bookmark-ios' :
                            'https://help.raindrop.io/article/26-add-bookmark-android'}
                        fromBottom
						onClose={this.onBrowserClose} />
				)}
            </>
        )
    }
}