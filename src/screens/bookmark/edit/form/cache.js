import React from 'react'
import t from 't'
import getCacheURL from 'data/modules/format/cache_url'

import Goto from 'co/goto'
import Browser from 'modules/browser'

export default class EditBookmarkCache extends React.Component {
    state = {
        link: ''
    }

    cacheTitle = t.s('open') + ' ' + t.s('permanentCopy').toLowerCase()
    
    onPress = async()=>
        this.setState({ link: await getCacheURL(this.props.item._id) })

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