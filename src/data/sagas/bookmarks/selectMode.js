import { put, takeEvery, select, all } from 'redux-saga/effects'
import _ from 'lodash-es'

import {
	SELECT_MODE_IMPORTANT_SELECTED,
	SELECT_MODE_REMOVE_SELECTED,
	SELECT_MODE_SCREENSHOT_SELECTED,
	SELECT_MODE_APPENDTAGS_SELECTED,
	SELECT_MODE_MOVE_SELECTED,

	SELECT_MODE_UNSELECT_BOOKMARK,
	SELECT_MODE_DISABLE,

	BOOKMARK_SCREENSHOT,
	BOOKMARK_UPDATE_REQ,
	BOOKMARK_REMOVE_REQ,
	BOOKMARK_MOVE,
	BOOKMARK_APPENDTAGS
} from '../../constants/bookmarks'

export default function* () {
	//Make Important Selected
	yield takeEvery(SELECT_MODE_IMPORTANT_SELECTED, function* (action) {
		yield runForSelected({
			type: BOOKMARK_UPDATE_REQ,
			set: {
				important: true
			}
		}, action)
	})

	//Make screenshots
	yield takeEvery(SELECT_MODE_SCREENSHOT_SELECTED, function* (action) {
		yield runForSelected({type: BOOKMARK_SCREENSHOT}, action)
	})

	//Append tags
	yield takeEvery(SELECT_MODE_APPENDTAGS_SELECTED, function* (action) {
		yield runForSelected({type: BOOKMARK_APPENDTAGS, tags: action.tags}, action)
	})

	//Remove selected
	yield takeEvery(SELECT_MODE_REMOVE_SELECTED, function* (action) {
		yield runForSelected({type: BOOKMARK_REMOVE_REQ}, action)
	})

	//Move selected
	yield takeEvery(SELECT_MODE_MOVE_SELECTED, function* (action) {
		yield runForSelected({type: BOOKMARK_MOVE, collectionId: action.to}, action)
	})
}

function* runForSelected(obj, action) {
	try{
		const state = yield select()
		yield all(_.map(state.bookmarks.selectMode.ids, (id)=>(
			all([
				put(Object.assign({_id: id}, obj)),
				put({
					type: SELECT_MODE_UNSELECT_BOOKMARK,
					_id: id
				})
			])
		)))

		yield put({
			type: SELECT_MODE_DISABLE
		})

		if (typeof action.onSuccess == 'function')
			action.onSuccess()
	}catch(e){
		if (typeof action.onFail == 'function')
			action.onFail()
	}
}