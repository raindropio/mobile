import { call, put, takeEvery, select, all } from 'redux-saga/effects'
import _ from 'lodash-es'
import Api from '../../modules/api'

import {
	SELECT_MODE_IMPORTANT_SELECTED,
	SELECT_MODE_REMOVE_SELECTED,
	SELECT_MODE_SCREENSHOT_SELECTED,
	SELECT_MODE_APPENDTAGS_SELECTED,
	SELECT_MODE_MOVE_SELECTED,

	SELECT_MODE_DISABLE,

	BOOKMARK_UPDATE_SUCCESS,
	BOOKMARK_REMOVE_SUCCESS,
} from '../../constants/bookmarks'

import {
	getScreenshotURL
} from '../../helpers/defaults'

export default function* () {
	//Make Important Selected
	yield takeEvery(SELECT_MODE_IMPORTANT_SELECTED, function* (action) {
		yield updateBookmarks({
			set: {
				important: true
			}
		}, action)
	})

	//Make screenshots
	yield takeEvery(SELECT_MODE_SCREENSHOT_SELECTED, function* (action) {
		yield updateBookmarks({
			set: {
				media: [{link: '<screenshot>'}]
			},
			mutate: (item)=>({
				...item,
				media: [{link: getScreenshotURL(item.link), screenshot: true}, ...item.media||[]],
				cover: getScreenshotURL(item.link),
				coverId: 0
			})
		}, action)
	})

	//Append tags
	yield takeEvery(SELECT_MODE_APPENDTAGS_SELECTED, function* (action) {
		if (!action.tags.length)
			return

		yield updateBookmarks({
			set: {
				tags: action.tags
			},
			mutate: (item)=>({
				...item,
				tags: [...item.tags||[], ...action.tags]
			})
		}, action)
	})

	//Move selected
	yield takeEvery(SELECT_MODE_MOVE_SELECTED, function* (action) {
		yield updateBookmarks({
			set: {
				collectionId: action.to
			}
		}, action)
	})

	//Remove selected
	yield takeEvery(SELECT_MODE_REMOVE_SELECTED, removeBookmarks)
}

function* updateBookmarks({set, mutate}, {onSuccess, onFail}) {
	try{
		const state = yield select()
		const { spaceId, ids } = state.bookmarks.selectMode

		const { result=false, modified=0 } = yield call(Api.put, `raindrops/${spaceId}`, {
			...set,
			ids
		})
		if (!result)
			throw new Error('cant update selected bookmarks')

		//Mutations
		let mutations = []

		if (modified)
			mutations = _.map(ids, (_id)=>{
				let item = {...state.bookmarks.elements[_id], ...state.bookmarks.meta[_id]}

				if (mutate)
					item = mutate(item)
				else
					item = {...item, ...set}

				return put({
					type: BOOKMARK_UPDATE_SUCCESS,
					_id,
					item
				})
			})

		mutations.push(put({
			type: SELECT_MODE_DISABLE
		}))

		yield all(mutations)

		if (typeof onSuccess == 'function')
			onSuccess()
	}catch(e){
		if (typeof onFail == 'function')
			onFail()
	}
}

function* removeBookmarks({onSuccess, onFail}) {
	try{
		const state = yield select()
		const { spaceId, ids } = state.bookmarks.selectMode

		const { result=false, modified=0 } = yield call(Api.del, `raindrops/${spaceId}`, { ids })
		if (!result)
			throw new Error('cant remove selected bookmarks')

		//Mutations
		let mutations = []

		if (modified)
			mutations = _.map(ids, (_id)=>
				put({
					type: BOOKMARK_REMOVE_SUCCESS,
					_id
				})
			)

		mutations.push(put({
			type: SELECT_MODE_DISABLE
		}))

		yield all(mutations)

		if (typeof onSuccess == 'function')
			onSuccess()
	}catch(e){
		if (typeof onFail == 'function')
			onFail()
	}
}