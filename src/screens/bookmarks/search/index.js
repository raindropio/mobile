import React from 'react'
import fadeIn from 'co/screen/animations/fadeIn'
import t from 't'
import color from 'co/collections/utils/color'

import View from './view'

class SearchScreen extends React.Component {
	static defaultProps = {
		spaceId: '0s'
	}

	static options = ({spaceId=0})=>({
		tintColor: color(parseInt(spaceId)),

		topBar: {
			animate: false,
			visible: false,
			drawBehind: true
		},

		bottomTabs: {
			visible: parseInt(spaceId)==0
		},

		bottomTab: {
			icon: require('assets/images/tab/search.png'),
			text: t.s('defaultCollection-0')
		},
		
		animations: {
			push: {
				content: fadeIn
			}
		}
	})

	render() {
		return (
			<View
				{...this.props} />
		)
	}
}

export default SearchScreen