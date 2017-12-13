const ACTIONS = {
	FETCH_IMAGES: "FETCH_IMAGES",
	SET_IMAGES: "SET_IMAGES",
	LOAD_IMAGE: "LOAD_IMAGE",
	IMAGE_LOADED: "IMAGE_LOADED",
	IMAGE_ERROR: "IMAGE_ERROR"
};

/*action creators*/

export const fetchImages = ({url}) => ({
	type: ACTIONS.FETCH_IMAGES,
	url
});

export const setImages = ({ images }) => ({
	type: ACTIONS.SET_IMAGES,
	images
});

export const loadImage = ({ url }) => ({
	type: ACTIONS.LOAD_IMAGE,
	url
});


export const imageLoaded = ({ url }) => ({
	type: ACTIONS.IMAGE_LOADED,
	url
});

export const imageError = ({ url }) => ({
	type: ACTIONS.IMAGE_ERROR,
	url
});

export default ACTIONS;
