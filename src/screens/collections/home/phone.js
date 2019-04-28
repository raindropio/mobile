import React from 'react'
import t from 't'
import _ from 'lodash'
import { Platform } from 'react-native'
import Navigation from 'modules/navigation'
import TreeContainer from 'co/collections/items'
import buttons from 'co/collections/items/buttons'

const options = {
	hideIds: [0]
}

class HomeScreen extends React.Component {
	static options() {
		return {
			topBar: {
				title: {
					component: {
						name: 'component/logoText',
						alignment: Platform.OS == 'ios' ? 'center' : 'fill'
					}
				},
				...buttons
			},
			bottomTab: {
				icon: require('assets/images/tab/home.png'),
				text: _.capitalize(t.s('collectionsCount'))
			}
		}
	}

	onItemTap = (item)=>{
		Navigation.push(this.props, 'bookmarks/home', {spaceId: item._id})
	}

	render() {
		return (
			<TreeContainer 
				componentId={this.props.componentId}
				resetLastCollectionId={true}
				options={options}
				onItemTap={this.onItemTap} />
		)
	}
}

export default HomeScreen