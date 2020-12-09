import Immutable from 'seamless-immutable'
import app from './app'
import extension from './extension'

const reducer = (state = initialState, action)=>{
	const _app = app(state,action);
	if (_app) state = state.merge(_app);

	const _extension = extension(state,action);
	if (_extension) state = state.merge(_extension);

	switch (action.type) {
		default:
			return state;
	}
}

const initialState = Immutable({})

export default {
	local: reducer
}