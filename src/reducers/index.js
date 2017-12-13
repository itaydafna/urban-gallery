import { combineReducers } from "redux";
import images from "./images";
import loadedImages from "./loadedImages";
import { responsiveStateReducer } from "redux-responsive";

export default combineReducers({
	images,
	loadedImages,
	browser: responsiveStateReducer
});
