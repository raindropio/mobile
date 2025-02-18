import { PureComponent } from 'react';
import Header from 'co/navigation/header'
import Fab from '../fab'
import Collections from 'co/collections/items'
import FiltersTags from './filters_tags'

class HomeScreen extends PureComponent {
	static options = ({ navigation })=>({
		title: 'Raindrop.io',
		headerTitleAlign: 'left',
		headerStyle: {
			elevation: 0,
			shadowOpacity: 0
		},
		headerRight: ()=>(<>
			<Header.Button 
				icon='search'
				onPress={()=>navigation.navigate('space/search', { spaceId: 0 })} />

			<Header.Button 
				icon='settings-2'
				onPress={()=>navigation.navigate('settings')} />
		</>)
	})

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