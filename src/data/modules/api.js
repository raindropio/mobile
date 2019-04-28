import { race, call } from 'redux-saga/effects'
import { delay, runSaga } from 'redux-saga'
import { 
	API_ENDPOINT_URL,
	APP_BASE_URL,
	API_RETRIES,
	API_TIMEOUT
} from '../constants/app'

function* get(url, overrideOptions={}) {
	const res = yield req(url, Object.assign({}, defaultOptions, overrideOptions))

	var json = {}
	if (res.headers)
	if ((res.headers.get('Content-Type')||'').toLowerCase().indexOf('application/json')!=-1){
		json = yield res.json()
		checkJSON(json)
	}

	return json;
}

function* put(url, data) {
	const res = yield req(url, Object.assign({}, defaultOptions, {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}))
	const json = yield res.json()
	checkJSON(json)

	return json;
}

function* post(url, data) {
	const res = yield req(url, Object.assign({}, defaultOptions, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}))
	const json = yield res.json()
	checkJSON(json)

	return json;
}

function* del(url) {
	const res = yield req(url, Object.assign({}, defaultOptions, {
		method: 'DELETE'
	}))
	const json = yield res.json()
	checkJSON(json)

	return json;
}

function* req(url, options) {
	var finalURL = API_ENDPOINT_URL + url
	if (url.indexOf('/') == 0)
		finalURL = APP_BASE_URL + url

	for(let i = 0; i < API_RETRIES; i++){
		try{
			const winner = yield race({
				req: call(fetchWrap, finalURL, options),
				t: call(delay, API_TIMEOUT)
			})

			if (!winner.req)
				throw new Error('timeout')

			return winner.req;
		}catch({message=''}){
			if (message == 'timeout')
				break;
			else if(i < API_RETRIES-1) {
				yield call(delay, 100); //stop 100ms and try again
			}
		}
	}

	throw new Error('failed to load '+finalURL)
}

const fetchWrap = (url, options)=>(
	fetch(url, options)
		.then((res)=>{
			if (res.status >= 200 && res.status < 300)
				return res
			else
				throw new Error('fail_fetch_status')
		})
)

const checkJSON = (json)=>{
	if (typeof json.auth === 'boolean')
		if (json.auth === false)
			throw new Error('notAuthorized')
}

const defaultOptions = {
	credentials: 'include'
}

const convertGeneratorToPromise = (gen)=>function(){
	const a=arguments; 
	return runSaga({onError:()=>{}}, function*(){
		return yield gen(...a)
	}).done
}

export default {
	get,
	put,
	post,
	del,

	_get: convertGeneratorToPromise(get),
	_put: convertGeneratorToPromise(put),
	_post: convertGeneratorToPromise(post),
	_del: convertGeneratorToPromise(del)
}