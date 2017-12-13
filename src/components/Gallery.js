import React, { Component } from "react";
import { Table, Column } from "fixed-data-table-2";
import { connect } from "react-redux";
import * as actions from "../actions";
import _ from "lodash";
import "fixed-data-table-2/dist/fixed-data-table.css";

import Image from "./Image";

import PATHS from "../constants/paths";

import "./Gallery.css";

class Gallery extends Component {
	componentWillMount() {
		this.props.fetchImages({ url: PATHS.GALLERY_DATA });
	}
	render() {
		const { images, browser } = this.props;
		const rowLength = browser && browser.lessThan.medium ? 2 : 4;
		const scrollBarWidth = 30;
		const headerHeight = 55;
		const chunkedImages = _.chunk(images, rowLength);
		const columns = [];
		const imagePad = 5;
		//calculating img size based on device's viewport 
		const size = browser && browser.lessThan.medium
			? (window.innerWidth - scrollBarWidth) / 2 - 2 * imagePad
			: 300;
		const tableHeight = window.innerHeight - headerHeight;
		const tableWidth = (size + 2 * imagePad) * rowLength + scrollBarWidth;

		for (let i = 0; i < rowLength; i++) {
			columns.push(
				<Column
					columnKey={i.toString()}
					key={i}
					cell={
						<Image
							data={chunkedImages}
							size={size}
							loadDelay={300}
						/>
					}
					width={size + imagePad * 4}
				/>
			);
		}

		return (
			<div className="gallery">
				<header style={{ height: headerHeight }}>
					<h1>URBAN GALLERY</h1>
				</header>
				{images && images.length
					? <Table
							bufferRowCount={1}
							overflowX="hidden"
							rowHeight={size + imagePad * 2}
							headerHeight={0}
							rowsCount={chunkedImages.length}
							width={tableWidth}
							height={tableHeight}
							touchScrollEnabled={true}
						>
							{columns}
						</Table>
					: null}
			</div>
		);
	}
}

const mapStateToProps = ({ images, browser }) => ({
	images,
	browser
});

export default connect(mapStateToProps, { ...actions })(Gallery);
