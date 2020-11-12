import React from 'react'
import { isTablet } from 'modules/native'
import Context from '../context'
import TreeContainer from 'co/collections/items'
import { Buttons, Button, Title } from 'co/navigation/header'
import Profile from './profile'
import Search from './search'

class HomeScreen extends React.Component {
	static contextType = Context

	static options = {
		headerTitleAlign: 'left',
		headerStyle: {
			elevation: 0,
			shadowOpacity: 0
		}
	}

	onItemTap = async(item)=>
		this.props.navigation.navigate('browse', {spaceId: item._id})

	render() {
		return (
			<>
				<Title>
					<Profile />
				</Title>

				<Buttons>
					<Button 
						icon='settings-2'
						onPress={()=>this.props.navigation.navigate('settings')} />
				</Buttons>

				<TreeContainer 
					SearchComponent={isTablet ? undefined : <Search {...this.props} />}
					selectedId={this.context.spaceId}
					showEmptyState={true}
					onItemTap={this.onItemTap} />
			</>
		)
	}
}

export default HomeScreen