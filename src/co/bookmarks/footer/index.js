import { useSelector, useDispatch } from 'react-redux'
import { status, count as getCount } from 'data/selectors/bookmarks'
import { nextPage } from 'data/actions/bookmarks'

import View from './view'

export default function SpaceFooterContainer({ spaceId }) {
	const dispatch = useDispatch()

	return View({
		status: useSelector(state=>status(state, spaceId)),
		count: useSelector(state=>getCount(state, spaceId)),
		onNextPage: ()=>dispatch(nextPage(spaceId))
	})
}