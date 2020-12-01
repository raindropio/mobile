import React from 'react'
import t from 't'
import Goto from 'co/goto'
import Browser from 'modules/browser'

export default class ImportItem extends React.Component {
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
                    label={t.s('import')}
                    icon='upload-cloud'
                    color='purple'
                    onPress={this.onPress} />

                {this.state.open && (
					<Browser
						link='https://help.raindrop.io/article/17-importing-bookmarks'
                        fromBottom
						onClose={this.onBrowserClose} />
				)}
            </>
        )
    }
}