import React from 'react'
import { isTablet } from 'modules/native'
import Header from 'co/navigation/header'

import Context from '../context'
import Profile from './profile'
import Search from './search'
import Collections from 'co/collections/items'
import FiltersTags from './filters_tags'

class HomeScreen extends React.PureComponent {
	static contextType = Context

	static options = {
		headerTitleAlign: 'left',
		headerStyle: {
			elevation: 0,
			shadowOpacity: 0
		}
	}

	onItemPress = async(item)=>
		this.props.navigation.navigate('browse', {spaceId: item._id})

	onSystemDrop = ({ _id }, data)=>
		this.props.navigation.navigate('create', {
			...data,
			collectionId: parseInt(_id)
		})

	render() {
		return (
			<>
				<Header.Title a>
					<Profile />
				</Header.Title>

				<Header.Buttons a>
					<Header.Button 
						icon='settings-2'
						onPress={()=>this.props.navigation.navigate('settings')} />
				</Header.Buttons>
				
				<FiltersTags navigation={this.props.navigation}>
					{(customRows, customRowRenderer)=>
						<Collections 
							SearchComponent={isTablet ? undefined : <Search {...this.props} />}
							selectedId={this.context.spaceId}
							showEmptyState={true}
							onItemPress={this.onItemPress}
							onSystemDrop={this.onSystemDrop}

							customRows={customRows}
							customRowRenderer={customRowRenderer} />
					}
				</FiltersTags>
			</>
		)
	}
}

export default HomeScreen