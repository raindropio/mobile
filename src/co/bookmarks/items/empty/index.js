import { useSelector, useDispatch } from 'react-redux'
import { refresh } from 'data/actions/bookmarks'
import { status, getSearchEmpty } from 'data/selectors/bookmarks'

import View from './view'

export default function SpaceEmptyContainer({ spaceId, navigation }) {
	const dispatch = useDispatch()
	const main = useSelector(state=>status(state, spaceId).main)
	const searchEmpty = useSelector(state=>getSearchEmpty(state, spaceId))

	return (
		<View 
			spaceId={spaceId}
			status={main}
			searchEmpty={searchEmpty}
			onRefresh={()=>dispatch(refresh(spaceId))}
			navigation={navigation} />
	)
}