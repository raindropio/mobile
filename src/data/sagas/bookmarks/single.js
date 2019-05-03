import { call, put, takeEvery, select, all } from 'redux-saga/effects'
import Api from '../../modules/api'
import _ from 'lodash-es'

import {
	BOOKMARK_CREATE_REQ, BOOKMARK_CREATE_SUCCESS, BOOKMARK_CREATE_ERROR,
	BOOKMARK_UPDATE_REQ, BOOKMARK_UPDATE_SUCCESS, BOOKMARK_UPDATE_ERROR,
	BOOKMARK_REMOVE_REQ, BOOKMARK_REMOVE_SUCCESS, BOOKMARK_REMOVE_ERROR,
	BOOKMARK_UPLOAD_REQ, BOOKMARK_UPLOAD_PROGRESS,

	BOOKMARK_RECOVER, BOOKMARK_IMPORTANT, BOOKMARK_SCREENSHOT, BOOKMARK_APPENDTAGS, BOOKMARK_MOVE, BOOKMARK_PRELOAD
} from '../../constants/bookmarks'

import {
	getBookmark,
	getBookmarkScreenshotIndex,
	getMeta
} from '../../helpers/bookmarks'

import {
	getScreenshotURL
} from '../../helpers/defaults'

//Requests
export default function* () {
	//helpers
	yield takeEvery(BOOKMARK_RECOVER, recover)
	yield takeEvery(BOOKMARK_IMPORTANT, important)
	yield takeEvery(BOOKMARK_SCREENSHOT, screenshot)
	yield takeEvery(BOOKMARK_APPENDTAGS, appendTags)
	yield takeEvery(BOOKMARK_MOVE, move)
	yield takeEvery(BOOKMARK_PRELOAD, preload)

	//single
	yield takeEvery(BOOKMARK_CREATE_REQ, createBookmark)
	yield takeEvery(BOOKMARK_UPDATE_REQ, updateBookmark)
	yield takeEvery(BOOKMARK_REMOVE_REQ, removeBookmark)
	yield takeEvery(BOOKMARK_UPLOAD_REQ, uploadBookmark)
}

function* createBookmark({obj={}, ignore=false, onSuccess, onFail}) {
	if (ignore)
		return;

	try{
		const state = yield select()
		var collectionId = obj.collectionId || state.config.lastCollection

		const [parsed, checkCollectionId] = yield all([
			call(Api.get, 'parse?url='+encodeURIComponent(obj.link)),
			call(Api.get, 'collection/'+collectionId)
		])

		parsed.item = parsed.item || {}

		//Collection not found, so reset it
		if (!checkCollectionId.result)
			collectionId = 0

		const canonicalURL = obj.link //parsed.item.meta.canonical||

		const {item={}, result=false} = yield call(Api.post, 'raindrop', Object.assign({}, obj, {
			url: canonicalURL,
			link: canonicalURL,
			title: parsed.item.title,
			excerpt: parsed.item.excerpt,
			media: parsed.item.media,
			type: parsed.item.type,
			html: parsed.item.html,
			collectionId: parseInt(collectionId||-1),
			cover: 0,
			parser: 'local'
		}))

		if (!result)
			throw new Error('cant save bookmark')

		item.new = true

		yield put({
			type: BOOKMARK_CREATE_SUCCESS,
			_id: item._id,
			item,
			onSuccess, onFail
		});
	} catch ({message}) {
		yield put({
			type: BOOKMARK_CREATE_ERROR,
			obj,
			error: message,
			onSuccess, onFail
		});
	}
}

function* uploadBookmark({obj={}, ignore=false, onSuccess, onFail}) {
	if (ignore)
		return;

	try{
		//Todo: Check collectionId before creating bookmark!
		const blank = yield call(Api.post, 'raindrop', {
			...obj,
			type: (obj.file.type.includes('image') ? 'image' : 'link'),
			url: 'https://raindrop.io/ping'
		})

		if (!blank.result)
			throw new Error('cant save bookmark')

		const {item={}, result=false} = yield call(Api.upload, `raindrop/${blank.item._id}/file`, {
			...obj.file,
			name: obj.file.name.split('.')[0]
		})

		if (!result)
			throw new Error('cant upload bookmark')

		yield put({
			type: BOOKMARK_CREATE_SUCCESS,
			_id: item._id,
			item,
			onSuccess, onFail
		});
	} catch ({message}) {
		yield put({
			type: BOOKMARK_CREATE_ERROR,
			error: message,
			onSuccess, onFail
		});
	}
}

function* updateBookmark({_id, set={}, ignore=false, onSuccess, onFail}) {
	if ((ignore)||(!_id))
		return;

	try{
		const originalReq = yield call(Api.get, 'raindrop/'+_id)
		if (!originalReq.result)
			throw new Error('cant find bookmark')

		const {item={}, result=false} = yield call(Api.put, 'raindrop/'+_id, set)

		if (!result)
			throw new Error('cant update bookmark')

		yield put({
			type: BOOKMARK_UPDATE_SUCCESS,
			_id: _id,
			item: item,
			originalItem: originalReq.item,
			changedFields: Object.keys(set),
			onSuccess, onFail
		});
	} catch ({message}) {
		yield put({
			type: BOOKMARK_UPDATE_ERROR,
			_id: _id,
			changedFields: Object.keys(set),
			error: message,
			onSuccess, onFail
		});
	}
}

function* removeBookmark({_id, ignore=false, onSuccess, onFail}) {
	if ((ignore)||(!_id))
		return;

	try{
		const {result=false} = yield call(Api.del, 'raindrop/'+_id)
		if (!result)
			throw new Error('cant remove bookmark')

		yield put({
			type: BOOKMARK_REMOVE_SUCCESS,
			_id: _id,
			onSuccess, onFail
		});
	} catch ({message}) {
		yield put({
			type: BOOKMARK_REMOVE_ERROR,
			_id: _id,
			error: message,
			onSuccess, onFail
		});
	}
}

function* recover({_id, ignore=false, onSuccess, onFail}) {
	if ((ignore)||(!_id))
		return;

	try{
		const state = yield select()
		const item = getBookmark(state.bookmarks, _id)

		yield put({
			type: BOOKMARK_UPDATE_REQ,
			_id: item._id,
			set: {
				collectionId: -1,
				removed: false
			},
			onSuccess
		})
	}catch({message}){
		yield put({
			type: BOOKMARK_UPDATE_ERROR,
			_id: _id,
			error: message,
			onFail
		})
	}
}

function* important({_id, ignore=false, onSuccess, onFail}) {
	if ((ignore)||(!_id))
		return;

	try{
		const state = yield select()
		const item = getBookmark(state.bookmarks, _id)

		yield put({
			type: BOOKMARK_UPDATE_REQ,
			_id: item._id,
			set: {
				important: !item.important
			},
			onSuccess
		})
	}catch({message}){
		yield put({
			type: BOOKMARK_UPDATE_ERROR,
			_id: _id,
			error: message,
			onFail
		})
	}
}

function* screenshot({_id, ignore=false, onSuccess, onFail}) {
	if ((ignore)||(!_id))
		return;

	try{
		const state = yield select()
		const item = getBookmark(state.bookmarks, _id)
		const meta = getMeta(state.bookmarks, _id)
		const screenshotIndex = getBookmarkScreenshotIndex(state.bookmarks, _id)

		var setReq = {}
		if (screenshotIndex!=-1){
			setReq = {
				coverId: screenshotIndex
			}
		}else{
			const newMedia = meta.media.concat([{type:'image', screenshot: true, link: getScreenshotURL(item.link)}])
			setReq = {
				media: newMedia,
				coverId: newMedia.length-1
			}
		}

		yield put({
			type: BOOKMARK_UPDATE_REQ,
			_id: item._id,
			set: setReq,
			onSuccess
		})
	}catch({message}){
		yield put({
			type: BOOKMARK_UPDATE_ERROR,
			_id: _id,
			error: message,
			onFail
		})
	}
}

function* appendTags({_id, tags=[], ignore=false, onSuccess, onFail}) {
	if ((ignore)||(!_id))
		return;

	try{
		const state = yield select()
		const item = getBookmark(state.bookmarks, _id)
		const meta = getMeta(state.bookmarks, _id)

		yield put({
			type: BOOKMARK_UPDATE_REQ,
			_id: item._id,
			set: {
				tags: _.uniq(meta.tags.concat(tags))
			},
			onSuccess
		})
	}catch({message}){
		yield put({
			type: BOOKMARK_UPDATE_ERROR,
			_id: _id,
			error: message,
			onFail
		})
	}
}

function* move({_id, collectionId, ignore=false, onSuccess, onFail}) {
	if ((ignore)||(!_id))
		return;

	try{
		yield put({
			type: BOOKMARK_UPDATE_REQ,
			_id: _id,
			set: {
				collectionId: collectionId
			},
			onSuccess
		})
	}catch({message}){
		yield put({
			type: BOOKMARK_UPDATE_ERROR,
			_id: _id,
			error: message,
			onFail
		})
	}
}

function* preload({link}) {
	yield call(Api.get, 'parse?url='+encodeURIComponent(link))
}