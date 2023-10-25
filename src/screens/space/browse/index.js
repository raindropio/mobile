import { useMemo, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { query } from 'data/selectors/bookmarks'
import { makeCollection } from 'data/selectors/collections'
import { load } from 'data/actions/bookmarks'

import Header from 'co/navigation/header'
import Fab from '../fab'
import Bookmarks from 'co/bookmarks/items'

function SpaceScreen({ route: { params: { spaceId } }, navigation }) {
	//state
	const getCollection = useMemo(()=>makeCollection(), [])
	const { title, collaborators } = useSelector(state=>getCollection(state, spaceId))
	const sort = useSelector(state=>query(state, spaceId).sort)

	//callbacks
	const onSearchBarPress = useCallback(()=>navigation.navigate('space/search', { spaceId }), [spaceId])
	const onCollectionPress = useCallback(spaceId=>navigation.push('space/browse', { spaceId }), [])
	const onSystemDrop = useCallback(data=>navigation.navigate('create', {...data, collectionId: parseInt(spaceId)}), [spaceId])
	const onMoreTap = useCallback(()=>navigation.navigate('collection/edit', { _id: spaceId }), [spaceId])
	const onShareTap = useCallback(()=>navigation.navigate('collection/sharing', { _id: spaceId }), [spaceId])

	//effects
	const dispatch = useDispatch()
	useEffect(()=>{ dispatch(load(spaceId, { sort })) }, [spaceId, sort])
	useEffect(()=>navigation.setOptions({ title }), [title])

	return (
		<>
			<Header.Buttons spaceId={spaceId}>
				{spaceId > 0 && (
					<Header.Button 
						icon={collaborators ? 'group-2' : 'user-add'}
						variant={collaborators ? 'fill' : 'line'}
						onPress={onShareTap} />
				)}

				<Header.Button 
					icon='search'
					onPress={onSearchBarPress} />

				{spaceId > 0 && (
					<Header.Button icon='more' onPress={onMoreTap} />
				)}
			</Header.Buttons>

			<Bookmarks 
				key={spaceId}
				spaceId={spaceId}
				onCollectionPress={onCollectionPress}
				onSystemDrop={onSystemDrop} />

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

SpaceScreen.options = {
	title: ''
}

export default SpaceScreen