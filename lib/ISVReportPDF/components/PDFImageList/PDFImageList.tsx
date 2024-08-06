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
	pdfStyle: {
		imagePerRow: number;
		imagePageBreak: boolean;
		pagePadding: number;
	};
	imageList: T[];
	getImageKey: (image: T) => string;
	getImageSrc: (image: T) => string;
	compareFunction: (a: T, b: T) => number;
	renderImageDesc?: (image: T) => React.ReactNode;
	renderImageNumber?: (image: T) => React.ReactNode;
}

function PDFImageList<T>({
	pdfStyle,
	imageList,
	getImageKey,
	getImageSrc,
	compareFunction,
	renderImageDesc,
	renderImageNumber,
}: Props<T>) {
	// 計算總共幾行，getImageKey
	let columnCount = Math.ceil(imageList.length / pdfStyle.imagePerRow);
	if (columnCount < 1) columnCount = 1;
	const columnArray = [...Array(columnCount).keys()];

	return (
		<ReactPDF.View style={{ marginTop: '1px' }} break={pdfStyle.imagePageBreak}>
			{columnArray.map((column) => {
				const renderImageList = imageList
					.sort(compareFunction)
					.slice(pdfStyle.imagePerRow * column, pdfStyle.imagePerRow + pdfStyle.imagePerRow * column);

				return (
					<ReactPDF.View
						key={column}
						style={{
							...styles.gallery,
							paddingRight: pdfStyle.pagePadding,
							paddingLeft: pdfStyle.pagePadding,
						}}
					>
						{renderImageList.map((image: T) => {
							return (
								<ReactPDF.View
									key={getImageKey(image)}
									style={{
										...styles.item,
										width: `calc(${100 / pdfStyle.imagePerRow}%)`,
										maxWidth: `calc(${100 / pdfStyle.imagePerRow}%)`,
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
