import { memo, useMemo } from 'react'
import { Alert } from 'react-native'
import t from 't'

import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { selectOne, unselectOne, oneImportant, oneRemove } from 'data/actions/bookmarks'
import { bookmark, makeIsSelected, selectModeEnabled, makeHighlights } from 'data/selectors/bookmarks'
import * as browser from 'screens/browser'

import View from './view'
import share from './share'

function BookmarkItemContainer({ bookmarkId, spaceId, navigation, ...etc }) {
	const dispatch = useDispatch()

	const getIsSelected = useMemo(()=>makeIsSelected(), [])
	const getHighlights = useMemo(()=>makeHighlights(), [])

	const item = useSelector(state=>bookmark(state, bookmarkId))
	const selectMode = useSelector(state=>selectModeEnabled(state, spaceId))
	const highlights = useSelector(state=>getHighlights(state, bookmarkId, 3), shallowEqual)
	const selected = useSelector(state=>selectMode ? getIsSelected(state, spaceId, bookmarkId) : false)

	const onSelect = ()=>{
		if (selected)
			dispatch(unselectOne(spaceId, item._id))
		else
			dispatch(selectOne(spaceId, item._id))
	}

	const onItemPress = ()=>{
		if (selectMode)
			onSelect()
		else
			browser.auto({ navigation, bookmark: item })
	}

	const onImportant = ()=>
		dispatch(oneImportant(item._id))

	const onRemove = ()=>
		dispatch(oneRemove(item._id, ()=>{}, error=>Alert.alert(t.s('error'), error?.message)))

	const onShare = ()=>
		share(item)

	const onMove = ()=>
		navigation.navigate('bookmark/path', { _id: item._id })

	const onEdit = ()=>
		navigation.navigate('bookmark/edit', { _id: item._id, spaceId })

	return (
		<View
			{...etc}
			spaceId={spaceId}
			navigation={navigation}
			item={item}
			highlights={highlights}
			selected={selected}
			selectModeEnabled={selectMode}
			onItemPress={onItemPress}
			onSelect={onSelect}
			onImportant={onImportant}
			onMove={onMove}
			onShare={onShare}
			onRemove={onRemove}
			onEdit={onEdit}
			/>
	)
}

export default memo(BookmarkItemContainer)