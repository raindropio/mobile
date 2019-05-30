import { call, put, takeLatest } from 'redux-saga/effects'
import Api from '../../modules/api'

import {
	COLLECTION_UPDATE_SUCCESS, COLLECTION_CREATE_SUCCESS,
	COLLECTION_COLOR_GET_REQ, COLLECTION_COLOR_GET_SUCCESS, COLLECTION_COLOR_GET_ERROR,
} from '../../constants/collections'

import {
	SPACE_LOAD_REQ,
	SPACE_RELOAD_REQ
} from '../../constants/bookmarks'

//Requests
export default function* () {
	//color
	yield takeLatest([
		SPACE_LOAD_REQ,
		SPACE_RELOAD_REQ,
		COLLECTION_UPDATE_SUCCESS,
		COLLECTION_CREATE_SUCCESS,
		COLLECTION_COLOR_GET_REQ
	], loadColor)
}

function* loadColor({_id, spaceId, ignore = false}) {
	const collectionId = parseInt(_id||spaceId||0)
	if ((ignore)||(spaceId<=0))
		return;

	try{
		const {hex=''} = yield call(Api.get, 'collection/'+collectionId+'/color')

		yield put({
			type: COLLECTION_COLOR_GET_SUCCESS,
			_id: collectionId,
			hex
		})
	}catch(error){
		yield put({
			type: COLLECTION_COLOR_GET_ERROR,
			_id: _id,
			error
		})
	}
}