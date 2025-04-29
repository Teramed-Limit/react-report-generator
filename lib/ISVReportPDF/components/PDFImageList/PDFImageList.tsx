import React from 'react';

import ReactPDF from '@react-pdf/renderer';

const styles = ReactPDF.StyleSheet.create({
	// Image
	gallery: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap',
	},
	item: {
		padding: '1px',
	},
	image: {
		width: '100%',
		maxWidth: '100%',
		objectFit: 'contain',
		objectPosition: 'center',
		height: 'auto',
	},
});

interface Props<T> {
	imageList: T[];
	imagePerRow: number;
	getImageKey: (image: T) => string;
	getImageSrc: (image: T) => string;
	compareFunction?: (a: T, b: T) => number;
	renderImageDesc?: (image: T) => React.ReactNode;
	renderImageNumber?: (image: T) => React.ReactNode;
}

function PDFImageList<T>({
	imageList,
	imagePerRow,
	getImageKey,
	getImageSrc,
	compareFunction,
	renderImageDesc,
	renderImageNumber,
}: Props<T>) {
	// 計算總共幾行，getImageKey
	let columnCount = Math.ceil(imageList.length / imagePerRow);
	if (columnCount < 1) columnCount = 1;
	const columnArray = [...Array(columnCount).keys()];

	return (
		<ReactPDF.View style={{ marginTop: '1px' }}>
			{columnArray.map((column) => {
				const sortedList = compareFunction ? imageList.sort(compareFunction) : imageList;
				const renderImageList = sortedList.slice(imagePerRow * column, imagePerRow + imagePerRow * column);

				return (
					<ReactPDF.View key={column} style={{ ...styles.gallery }}>
						{renderImageList.map((image: T) => {
							return (
								<ReactPDF.View
									key={getImageKey(image)}
									style={{
										...styles.item,
										width: `calc(${100 / imagePerRow}%)`,
										maxWidth: `calc(${100 / imagePerRow}%)`,
									}}
									wrap={false}
								>
									<ReactPDF.Image style={styles.image} src={getImageSrc(image)} />
									{renderImageDesc && renderImageDesc(image)}
									{renderImageNumber && renderImageNumber(image)}
								</ReactPDF.View>
							);
						})}
					</ReactPDF.View>
				);
			})}
		</ReactPDF.View>
	);
}

export default PDFImageList;
