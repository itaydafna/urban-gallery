import ACTIONS from "../actions";
const images = (state = [], action) => {
	switch (action.type) {
		case ACTIONS.SET_IMAGES:
			return action.images;
		default:
			return state;
	}
};

export default images;
