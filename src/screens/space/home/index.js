import { PureComponent } from 'react';
import Header from 'co/navigation/header'
import Fab from '../fab'
import Collections from 'co/collections/items'
import FiltersTags from './filters_tags'

class HomeScreen extends PureComponent {
	static options = {
		headerTitle: 'Raindrop.io',
		headerTitleAlign: 'left',
		headerStyle: {
			elevation: 0,
			shadowOpacity: 0
		}
	}

	onItemPress = async(item)=>{
		this.props.navigation.navigate('space/browse', {spaceId: item._id})
	}

	onSystemDrop = ({ _id }, data)=>
		this.props.navigation.navigate('create', {
			...data,
			collectionId: parseInt(_id)
		})

	render() {
		return (
			<>
				<Header.Buttons a>
					<Header.Button 
						icon='search'
						onPress={()=>this.props.navigation.navigate('space/search', { spaceId: 0 })} />
						
					<Header.Button 
						icon='settings-2'
						onPress={()=>this.props.navigation.navigate('settings')} />
				</Header.Buttons>
				
				<FiltersTags navigation={this.props.navigation}>
					{(customRows, customRowRenderer, customRowKeyExtractor)=>
						<Collections 
							SearchComponent={<></>}
							searchOffset={false}
							showEmptyState={true}

							onItemPress={this.onItemPress}
							onSystemDrop={this.onSystemDrop}

							customRows={customRows}
							customRowRenderer={customRowRenderer}
							customRowKeyExtractor={customRowKeyExtractor} />
					}
				</FiltersTags>

				<Fab navigation={this.props.navigation} />
			</>
		)
	}
}

export default HomeScreen