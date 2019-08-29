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
	yield takeEvery(
		SELECT_MODE_IMPORTANT_SELECTED, 
		updateBookmarks({
			set: ()=>({
				important: true
			})
		})
	)

	//Make screenshots
	yield takeEvery(
		SELECT_MODE_SCREENSHOT_SELECTED,
		updateBookmarks({
			set: ()=>({
				media: [{link: '<screenshot>'}]
			}),
			mutate: (action, item)=>({
				...item,
				media: [{link: getScreenshotURL(item.link), screenshot: true}, ...item.media||[]],
				cover: getScreenshotURL(item.link),
				coverId: 0
			})
		})
	)

	//Append tags
	yield takeEvery(
		SELECT_MODE_APPENDTAGS_SELECTED,
		updateBookmarks({
			validate: ({ tags=[] })=>{
				if (!tags.length)
					throw new Error('no tags specified')
			},
			set: ({ tags })=>({
				tags
			}),
			mutate: ({ tags }, item)=>({
				...item,
				tags: [...item.tags||[], ...tags]
			})
		})
	)

	//Move selected
	yield takeEvery(
		SELECT_MODE_MOVE_SELECTED,
		updateBookmarks({
			set: ({ to })=>({
				collectionId: to
			})
		})
	)

	//Remove selected
	yield takeEvery(SELECT_MODE_REMOVE_SELECTED, removeBookmarks)
}

const updateBookmarks = ({validate, set, mutate}) => (
	function* ({onSuccess, onFail, ...action}) {
		try{
			//Validate
			typeof validate == 'function' && validate(action)

			//Send update request
			const fields = set(action)
			const state = yield select()
			const { spaceId, ids } = state.bookmarks.selectMode

			const { result=false, modified=0 } = yield call(Api.put, `raindrops/${spaceId}`, {
				...fields,
				ids
			})
			if (!result)
				throw new Error('cant update selected bookmarks')

			//Generate side effects
			let mutations = []

			if (modified)
				mutations = _.map(ids, (_id)=>{
					let item = {...state.bookmarks.elements[_id], ...state.bookmarks.meta[_id]}

					if (mutate)
						item = mutate(action, item)
					else
						item = {...item, ...fields}

					return put({
						type: BOOKMARK_UPDATE_SUCCESS,
						_id,
						item
					})
				})

			mutations.unshift(put({
				type: SELECT_MODE_DISABLE
			}))

			yield all(mutations)

			typeof onSuccess == 'function' && onSuccess()
		}catch(e){
			console.log(e)
			typeof onFail == 'function' && onFail()
		}
	}
)

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

		mutations.unshift(put({
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