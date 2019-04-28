import {
	COLLECTION_COLOR_GET_SUCCESS, COLLECTION_COLOR_GET_ERROR
} from '../../constants/collections'

export default (state, action)=>{
	switch (action.type) {
		//Update
		case COLLECTION_COLOR_GET_SUCCESS:{
			if (state.getIn(['colors', action._id])!=action.hex)
				return state
					.setIn(['colors', action._id], action.hex)

			return state
		}

		case COLLECTION_COLOR_GET_ERROR:{
			return state
				.setIn(['colors', action._id], '')
		}
	}
}