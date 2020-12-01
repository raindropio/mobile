import t from 't'
import React from 'react'
import PropTypes from 'prop-types'

import Home from './home'
import Save from './save'

class BookmarkAdd extends React.Component {
	static propTypes = {
		route:  PropTypes.shape({
            params: PropTypes.shape({
				collectionId:	PropTypes.number,
				type:			PropTypes.string,
				values:			PropTypes.array
			})
		})
	}

	static options = {
		title: t.s('newBookmark')
	}
	
	render() {
		const { route, ...etc } = this.props

		if (route.params.type)
			return <Save {...etc} {...route.params} />
		else
			return <Home {...etc} {...route.params} />
	}
}

export default BookmarkAdd