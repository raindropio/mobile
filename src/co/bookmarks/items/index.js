import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { makeCollection } from 'data/selectors/collections'
import { bookmarksIds, status, makeViewHide, makeSort, selectModeEnabled } from 'data/selectors/bookmarks'
import { refresh, nextPage, oneReorder } from 'data/actions/bookmarks'

import Columns from './columns'
import Items from './view'
import SelectMode from '../selectMode'

export default function SpaceContainer({ spaceId=0, header, onCollectionPress }) {
	const dispatch = useDispatch()
	const navigation = useNavigation()

	const getCollection = useMemo(()=>makeCollection(), [])
	const getViewHide = useMemo(()=>makeViewHide(), [])
	const getSort = useMemo(()=>makeSort(), [])

	const main = useSelector(state=>status(state, spaceId).main)
	const collection = useSelector(state=>getCollection(state, spaceId))
	const data = useSelector(state=>bookmarksIds(state, spaceId))
	const selectMode = useSelector(state=>selectModeEnabled(state, spaceId))
	const sort = useSelector(state=>getSort(state, spaceId))
	const viewHide = useSelector(state=>getViewHide(state, spaceId))
	const listCoverRight = useSelector(state=>state.config.raindrops_list_cover_right)

	return (
		<>
			<Columns view={collection.view}>{numColumns=>
				<Items
					spaceId={spaceId}
					header={header}
					onCollectionPress={onCollectionPress}
					navigation={navigation}
					status={main}
					collection={collection}
					data={data}
					selectModeEnabled={selectMode}
					sort={sort}
					viewHide={viewHide}
					listCoverRight={listCoverRight}
					numColumns={numColumns}
					onRefresh={()=>dispatch(refresh(spaceId))}
					onNextPage={()=>dispatch(nextPage(spaceId))}
					onReorder={(origin, target)=>dispatch(oneReorder(origin, target))} />
			}</Columns>

			<SelectMode
				spaceId={spaceId}
				navigation={navigation} />
		</>
	)
}