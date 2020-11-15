import React from 'react'
import { isTablet } from 'modules/native'
import { Buttons, Button, Title } from 'co/navigation/header'

import Collections from 'co/collections/items/tree'
import Filters from 'co/filters/items'
import Tags from 'co/tags/items'
import Shadow from 'co/list/helpers/shadow'

import Context from '../context'
import Profile from './profile'
import Search from './search'
import { Groups, flexGroupZero } from './style'

class HomeScreen extends React.Component {
	static contextType = Context

	static options = {
		headerTitleAlign: 'left',
		headerStyle: {
			elevation: 0,
			shadowOpacity: 0
		}
	}

	groups = ['collections', 'filters', 'tags']

	onItemTap = async(item)=>
		this.props.navigation.navigate('browse', {spaceId: item._id})

	renderGroup = ({ item })=>{
		switch (item) {
			case 'collections':
				return (
					<Collections 
						style={flexGroupZero}
						SearchComponent={isTablet ? undefined : <Search {...this.props} />}
						selectedId={this.context.spaceId}
						showEmptyState={true}
						onItemTap={this.onItemTap} />
				)

			case 'filters':
				return (
					<Filters 
						style={flexGroupZero} />
				)

			case 'tags':
				return (
					<Tags 
						style={flexGroupZero} />
				)
		}
	}

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
				
				<Groups.Wrap>
					<Shadow>{onScroll=>
						<Groups.List 
							data={this.groups}
							renderItem={this.renderGroup}
							onScroll={onScroll} />
					}</Shadow>
				</Groups.Wrap>
			</>
		)
	}
}

export default HomeScreen