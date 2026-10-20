import Header from 'co/navigation/header'
import Fab from '../fab'
import Collections from 'co/collections/items'
import FiltersTags from './filters_tags'

function HomeScreen({ navigation }) {
	const onItemPress = async(item)=>{
		navigation.navigate('space/browse', {spaceId: item._id})
	}

	return (
		<>
			<FiltersTags navigation={navigation}>
				{(customRows, customRowRenderer, customRowKeyExtractor)=>
					<Collections
						SearchComponent={<></>}
						searchOffset={false}
						showEmptyState={true}

						onItemPress={onItemPress}

						customRows={customRows}
						customRowRenderer={customRowRenderer}
						customRowKeyExtractor={customRowKeyExtractor} />
				}
			</FiltersTags>

			<Fab navigation={navigation} />
		</>
	)
}

HomeScreen.options = ({ navigation })=>({
	title: 'Raindrop.io',
	headerTitleAlign: 'left',
	headerStyle: {
		elevation: 0,
		shadowOpacity: 0
	},
	headerRight: ()=>(<>
		<Header.Button
			icon='bard'
			onPress={()=>navigation.navigate('ask')} />

		<Header.Button
			icon='search'
			onPress={()=>navigation.navigate('space/search', { spaceId: 0 })} />

		<Header.Button
			icon='settings-2'
			onPress={()=>navigation.navigate('settings')} />
	</>)
})

export default HomeScreen