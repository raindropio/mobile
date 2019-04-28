import { call, put, takeEvery, select } from 'redux-saga/effects'
import Api from '../../modules/api'

import {
	BOOKMARK_UPDATE_REQ, BOOKMARK_UPDATE_ERROR,
	BOOKMARK_CREATE_REQ,

	BOOKMARK_DRAFT_LOAD_REQ, BOOKMARK_DRAFT_LOAD_SUCCESS, BOOKMARK_DRAFT_LOAD_ERROR, BOOKMARK_DRAFT_COMMIT,

	BOOKMARK_DRAFT_ENSURE_REQ, BOOKMARK_DRAFT_SET_STATUS
} from '../../constants/bookmarks'

//Requests
export default function* () {
	//draft
	yield takeEvery(BOOKMARK_DRAFT_LOAD_REQ, draftLoad)
	yield takeEvery(BOOKMARK_DRAFT_COMMIT, draftCommit)
	yield takeEvery(BOOKMARK_DRAFT_ENSURE_REQ, draftEnsure)
}

function* draftLoad({_id, ignore=false}) {
	if (ignore)
		return;

	try{
		const {item={}, result=false} = yield call(Api.get, 'raindrop/'+_id)
		if (!result)
			throw new Error('cant load bookmark')

		yield put({
			type: BOOKMARK_DRAFT_LOAD_SUCCESS,
			_id: _id,
			item: item
		});
	} catch ({message}) {
		yield put({
			type: BOOKMARK_DRAFT_LOAD_ERROR,
			_id: _id,
			error: message
		});
	}
}

function* draftCommit({_id, onSuccess, onFail}) {
	try{
		const state = yield select()
		const changedFields = state.bookmarks.getIn(['drafts', 'byId', _id, 'changedFields'])||[]
		const item = state.bookmarks.getIn(['drafts', 'byId', _id, 'item'])

		if ((changedFields.length)&&(item)) {
			var setItem = {}
			changedFields.forEach((key)=>{
				setItem[key] = item[key]
			})

			yield put({
				type: BOOKMARK_UPDATE_REQ,
				_id: _id,
				set: setItem,
				onSuccess, onFail
			})
		}else{
			onSuccess(item)
		}
	}catch({message}){
		yield put({
			type: BOOKMARK_UPDATE_ERROR,
			_id: _id,
			error: message,
			onSuccess, onFail
		})
	}
}

function* draftEnsure({link, obj, config}) {
	try{
		if (link=='empty')
			throw new Error('link is empty')

		const {id, result=false} = yield call(Api.post, 'check/url', {url: link})

		//found
		if (result)
			yield put({
				type: BOOKMARK_DRAFT_LOAD_REQ,
				_id: id
			});
		//create new
		else{
			if (config.save === false)
				yield put({
					type: BOOKMARK_DRAFT_SET_STATUS,
					status: 'notFound',
					obj: Object.assign({
						link
					}, obj)
				});
			else
				yield put({
					type: BOOKMARK_CREATE_REQ,
					obj: Object.assign({
						link
					}, obj)
				});
		}
	}catch({message}){
		yield put({
			type: BOOKMARK_DRAFT_LOAD_ERROR,
			link,
			error: message
		})
	}
}