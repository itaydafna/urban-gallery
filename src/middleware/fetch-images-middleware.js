import fetchImages from "../services/fetch-images";
import ACTIONS, { setImages } from "../actions";

const fetchImagesMiddleware = ({ dispatch }) => next => action => {
	if (action.type === ACTIONS.FETCH_IMAGES) {
		const { url } = action;
		fetchImages({ url }).then(images => {
			dispatch(setImages({ images: images }));
		});
	}
	next(action);
};

export default fetchImagesMiddleware;
