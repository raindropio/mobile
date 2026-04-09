import { useMemo, useCallback, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { query } from 'data/selectors/bookmarks'
import { makeCollection } from 'data/selectors/collections'
import { load } from 'data/actions/bookmarks'

import Header from 'co/navigation/header'
import Fab from '../fab'
import Bookmarks from 'co/bookmarks/items'
import Nested from './nested'

function SpaceScreen({ route: { params: { spaceId } }, navigation }) {
	//state
	const getCollection = useMemo(()=>makeCollection(), [])
	const { title } = useSelector(state=>getCollection(state, spaceId))
	const sort = useSelector(state=>query(state, spaceId).sort)

	//callbacks
	const onCollectionPress = useCallback(spaceId=>navigation.push('space/browse', { spaceId }), [])
	const onSystemDrop = useCallback(data=>navigation.navigate('create', {...data, collectionId: parseInt(spaceId)}), [spaceId])

	//effects
	const dispatch = useDispatch()
	useLayoutEffect(()=>{ dispatch(load(spaceId, { sort })) }, [spaceId, sort])
	useLayoutEffect(()=>navigation.setOptions({ title }), [navigation, title])

	return (
		<>
			<Bookmarks
				key={spaceId}
				spaceId={spaceId}
				onCollectionPress={onCollectionPress}
				onSystemDrop={onSystemDrop}
				header={<Nested spaceId={spaceId} onCollectionPress={onCollectionPress} />} />

			<Fab
				spaceId={spaceId}
				navigation={navigation} />
		</>
	)
}

SpaceScreen.propTypes = {
	route:  PropTypes.shape({
		params: PropTypes.shape({
			spaceId: PropTypes.number
		})
	})
}

//headerRight is defined statically (not via setOptions in useEffect) so
//react-native-screens applies it once on screen creation, avoiding a race
//that crashed Android with "The specified child already has a parent".
SpaceScreen.options = ({ navigation, route: { params: { spaceId } } }) => ({
	title: '',
	headerRight: () => (
		<Header.ButtonsWrap>
			<Header.Button
				icon='bard'
				onPress={() => navigation.navigate('ask')} />

			<Header.Button
				icon='search'
				onPress={() => navigation.navigate('space/search', { spaceId })} />

			{spaceId > 0 && (
				<Header.Button
					icon='more'
					onPress={() => navigation.navigate('collection/edit', { _id: spaceId })} />
			)}
		</Header.ButtonsWrap>
	)
})

export default SpaceScreen