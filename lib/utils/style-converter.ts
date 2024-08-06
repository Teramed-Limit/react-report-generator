import { CSSProperties } from 'react';

import { isEmptyOrNil } from './general.ts';

export const styleConverter = (style: CSSProperties) => {
	return {
		fontSize: !isEmptyOrNil(style?.fontSize) ? `${style?.fontSize}pt` : '10pt',
		paddingTop: !isEmptyOrNil(style?.paddingTop) ? `${style?.paddingTop}pt` : 0,
		paddingBottom: !isEmptyOrNil(style?.paddingBottom) ? `${style?.paddingBottom}pt` : 0,
		paddingRight: !isEmptyOrNil(style?.paddingRight) ? `${style?.paddingRight}pt` : 0,
		paddingLeft: !isEmptyOrNil(style?.paddingLeft) ? `${style?.paddingLeft}pt` : 0,
		marginTop: !isEmptyOrNil(style?.marginTop) ? `${style?.marginTop}pt` : 0,
		marginBottom: !isEmptyOrNil(style?.marginBottom) ? `${style?.marginBottom}pt` : 0,
		marginRight: !isEmptyOrNil(style?.marginRight) ? `${style?.marginRight}pt` : 0,
		marginLeft: !isEmptyOrNil(style?.marginLeft) ? `${style?.marginLeft}pt` : 0,
		borderTop: !isEmptyOrNil(style?.borderTop) ? `${style?.borderTop}pt` : 0,
		borderBottom: !isEmptyOrNil(style?.borderBottom) ? `${style?.borderBottom}pt` : 0,
		borderRight: !isEmptyOrNil(style?.borderRight) ? `${style?.borderRight}pt` : 0,
		borderLeft: !isEmptyOrNil(style?.borderLeft) ? `${style?.borderLeft}pt` : 0,
		borderStyle:
			!isEmptyOrNil(style?.borderLeft) ||
			!isEmptyOrNil(style?.borderRight) ||
			!isEmptyOrNil(style?.borderTop) ||
			!isEmptyOrNil(style?.borderBottom)
				? 'solid'
				: 'none',
	};
};
