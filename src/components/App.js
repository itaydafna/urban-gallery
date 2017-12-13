import React from "react";
import { Provider } from "react-redux";

import store from "../store/store";
import Gallery from "./Gallery";

const App = () => (
	<Provider store={store}>
		<Gallery />
	</Provider>
);

export default App;
