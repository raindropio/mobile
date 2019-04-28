import { call, put, takeEvery, select } from 'redux-saga/effects'
import Api from '../../modules/api'

import {
	COLLECTION_UPDATE_REQ, COLLECTION_UPDATE_ERROR,

	COLLECTION_DRAFT_LOAD_REQ, COLLECTION_DRAFT_LOAD_SUCCESS, COLLECTION_DRAFT_LOAD_ERROR, COLLECTION_DRAFT_COMMIT,
} from '../../constants/collections'

//Requests
export default function* () {
	//draft
	yield takeEvery(COLLECTION_DRAFT_LOAD_REQ, draftLoad)
	yield takeEvery(COLLECTION_DRAFT_COMMIT, draftCommit)
}

function* draftLoad({_id=0, ignore=false}) {
	if ((ignore)||(_id<=0))
		return;

	try{
		if (_id<=0)
			throw new Error('cant load collection')

		const state = yield select()
		var loadedItem = state.collections.items[_id]

		//Use cached version
		if (!loadedItem) {
			const {item={}, result} = yield call(Api.get, 'collection/'+_id)
			if (!result)
				throw new Error('cant load collection')
			loadedItem = item
		}

		yield put({
			type: COLLECTION_DRAFT_LOAD_SUCCESS,
			_id: _id,
			item: loadedItem
		});
	} catch ({message}) {
		yield put({
			type: COLLECTION_DRAFT_LOAD_ERROR,
			_id: _id,
			error: message
		});
	}
}

function* draftCommit({_id}) {
	try{
		const state = yield select()
		const changedFields = state.collections.getIn(['drafts', _id, 'changedFields'])||[]
		const item = state.collections.getIn(['drafts', _id, 'item'])

		if ((changedFields.length)&&(item)) {
			var setItem = {}
			changedFields.forEach((key)=>{
				setItem[key] = item[key]
			})

			yield put({
				type: COLLECTION_UPDATE_REQ,
				_id: _id,
				set: setItem
			})
		}
	}catch({message}){
		yield put({
			type: COLLECTION_UPDATE_ERROR,
			_id: _id,
			error: message
		})
	}
}