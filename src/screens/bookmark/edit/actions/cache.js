import React from 'react'
import t from 't'
import { API_ENDPOINT_URL } from 'data/constants/app'

import Goto from 'co/goto'
import Browser from 'modules/browser'

export default class EditBookmarkCache extends React.Component {
    state = {
        link: ''
    }

    cacheTitle = t.s('open') + ' ' + t.s('permanentCopy').toLowerCase()
    
    onPress = async()=>
        this.setState({ link: `${API_ENDPOINT_URL}/raindrop/${this.props.item._id}/cache` })

    onBrowserClose = ()=>
        this.setState({ link: '' })

	render() {
        const { item } = this.props
        const { link } = this.state

        if (item.cache != 'ready')
            return null

		return (
            <>
                <Goto 
                    icon='file-history'
                    action=''
                    onPress={this.onPress}
                    label={this.cacheTitle} />

                {!!this.state.link && (
					<Browser
						link={link}
                        fromBottom
						onClose={this.onBrowserClose} />
				)}
            </>
        )
	}
}