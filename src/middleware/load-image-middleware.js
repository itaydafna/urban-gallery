import ACTIONS, { imageLoaded, imageError } from "../actions";
//a redux middleware fo handling image loading and managing the load statuses on the loadedImage reducer
const loadImagesMiddleware = ({ getState, dispatch }) => next => action => {
	const { loadedImages } = getState();
	if (action.type === ACTIONS.LOAD_IMAGE) {
		const { url } = action;
		if (!loadedImages[url]) {
			const img = new Image();
			img.onload = () => {
				dispatch(imageLoaded({ url }));
			};
			img.onerror = () => {
				dispatch(imageError({ url }));
			};
			img.src = action.url;
		}
	}
	next(action);
};

export default loadImagesMiddleware;
