import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import IMAGE_LOAD_STATUSES from "../constants/image-load-statuses";
import Loader from "./Loader";
import imgError from "../assets/broken-image.png";
import "./Image.css";

class Image extends Component {
	componentWillMount() {
		const src = this.getSrc(this.props);
		if (!!src) {
			this.loadImageOnlyIfNeeded({ url: src });
		}
	}

	componentWillReceiveProps(nextProps) {
		const { rowIndex } = nextProps;
		const src = this.getSrc(nextProps);
		//dispatch img load only if scroll occurred (row index change)
		if ((this.props.rowIndex !== rowIndex) && src) {
			this.loadImageOnlyIfNeeded({ url: src });

		}
	}

	loadImageOnlyIfNeeded({ url }) {
		this.loadImageTimeoutHandler = setTimeout(() => {
			/* condition to verify that the current url hasn't changed since the application of `this.loadImageOnlyIfNeeded`
			only if scroll has paused for the `loadDelay` interval the image should be loaded*/
			if (url === this.getSrc(this.props)) {
				this.props.loadImage({ url });
			}
		}, this.props.loadDelay);
	}

	getSrc(props) {
		const { data, rowIndex, columnKey, browser } = props;
		//show low resolution on mobile
		const attr = browser && browser.lessThan.medium
			? "thumbnail"
			: "low_resolution";

		return (
			data[rowIndex][columnKey] &&
			data[rowIndex][columnKey][attr] &&
			data[rowIndex][columnKey][attr].url
		);
	}

	componentWillUnmount() {
		clearTimeout(this.loadImageTimeoutHandler);
	}

	render() {
		const { data, rowIndex, columnKey, size, loadedImages } = this.props;

		const src = this.getSrc(this.props);
		const imgBoxBackground =
			(data[rowIndex][columnKey] &&
				data[rowIndex][columnKey].prominentColor) ||
			"#fafafa";

		const imageLoadStatus = src && loadedImages[src];

		return (
			<div
				className="img-box"
				style={{ backgroundColor: imgBoxBackground }}
			>
				{imageLoadStatus &&
					imageLoadStatus === IMAGE_LOAD_STATUSES.LOADED
					// eslint-disable-next-line
					? <img width={size} height={size} src={src} />
					: imageLoadStatus === IMAGE_LOAD_STATUSES.ERROR
							? <img
									width={size * 0.5}
									height={size * 0.5}
									src={imgError}
									alt="error loading"
								/>
							: <Loader />}
			</div>
		);
	}
}

const mapStateToProps = ({ loadedImages, browser }) => ({
	loadedImages,
	browser
});

export default connect(mapStateToProps, { ...actions })(Image);
