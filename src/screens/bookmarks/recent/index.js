import React from 'react'
import { Platform } from 'react-native'
import t from 't'
import SpaceContainer from 'co/bookmarks/items'

class RecentScreen extends React.Component {
	static options = ()=>({
		topBar: {
			title: {
				component: {
					name: 'bookmarks/title',
					alignment: Platform.OS == 'ios' ? 'center' : 'fill',

					passProps: {
						spaceId: 0,
						text: t.s('recent')
					}
				}
			},

			rightButtons: [{
				...Platform.select({
					ios: {
						systemItem: 'add',
					},
					android: {
						icon: require('assets/images/add.png'),
					},
				}),
				id: 'add'
			}]
		},
		bottomTab: {
			icon: require('assets/images/tab/recent.png'),
			text: t.s('recent')
		}
	})
	
	render() {
		return (
			<SpaceContainer key='0' spaceId='0' hideHead={true} componentId={this.props.componentId} />
		)
	}
}

export default RecentScreen