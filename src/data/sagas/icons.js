import { call, put, takeLatest } from 'redux-saga/effects'
import Api from '../modules/api'
import {
	ICONS_LOAD_REQ, ICONS_LOAD_SUCCESS, ICONS_LOAD_ERROR
} from '../constants/icons'

//Requests
export default function* () {
	yield takeLatest([
		ICONS_LOAD_REQ
	], loadIcons)
}

function* loadIcons({ignore=false}) {
	if (ignore)
		return;

	try {
		const {items, pro, path, result=false} = yield call(Api.get, 'coverTemplates', {cache: 'force-cache'});

		if (!result)
			throw new Error('cant load icons')

		yield put({
			type: ICONS_LOAD_SUCCESS,
			items,
			pro,
			path
		});
	} catch (error) {
		yield put({
			type: ICONS_LOAD_ERROR,
			error
		});
	}
}