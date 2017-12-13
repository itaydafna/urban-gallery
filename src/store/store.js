import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers/index";
import fetchImagesMiddleware from "../middleware/fetch-images-middleware";
import loadImageMiddleware from "../middleware/load-image-middleware";
import { responsiveStoreEnhancer } from "redux-responsive";

const store = createStore(
	reducers,
	responsiveStoreEnhancer,
	applyMiddleware(fetchImagesMiddleware, loadImageMiddleware)
);

export default store;
