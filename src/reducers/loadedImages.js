import ACTIONS from "../actions";
import IMAGE_LOAD_STATUSES from "../constants/image-load-statuses";

/*a reducer for tracking which images have already been loadedImages. has the following form: 
{
	[src1]: "LOADING",
	[src2]: "LOADED",
	[src3]: "ERROR",
	...
}
*/
const loadedImages = (state = {}, action) => {
	switch (action.type) {
		case ACTIONS.LOAD_IMAGE:
			if (state[action.url]) {
				return state;
			}
			return {
				...state,
				...{ [action.url]: IMAGE_LOAD_STATUSES.LOADING }
			};
		case ACTIONS.IMAGE_LOADED:
			return {
				...state,
				...{ [action.url]: IMAGE_LOAD_STATUSES.LOADED }
			};
		case ACTIONS.IMAGE_ERROR:
			return { ...state, ...{ [action.url]: IMAGE_LOAD_STATUSES.ERROR } };
		default:
			return state;
	}
};

export default loadedImages;
