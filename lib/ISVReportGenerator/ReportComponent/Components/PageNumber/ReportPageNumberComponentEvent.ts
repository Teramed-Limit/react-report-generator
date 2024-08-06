import React from 'react';

import { ReportComponentType } from '../../../../types/report-generator/component/rep-component.ts';
import { RepPageNumberComponent } from '../../../../types/report-generator/component/rep-page-num-component.ts';
import { Point } from '../../../../types/report-generator/rep-report.ts';
import { generateUUID } from '../../../../utils/general.ts';

const ReportPageNumberComponentEvent = (): {
	onGenerate: (e: React.MouseEvent, pos: Point) => RepPageNumberComponent;
	onMouseUp: () => void;
	onMouseMove: (e: React.MouseEvent) => void;
	onMouseDown: () => void;
} => {
	const onGenerate = (e: React.MouseEvent, pos: Point) => {
		return {
			uuid: generateUUID(),
			x: pos.x,
			y: pos.y,
			componentType: ReportComponentType.PageNumber,
			fontSize: 16,
			fontName: 'Arial',
			fontStyle: 'normal',
			fontColor: 'gray',
			fontWeight: 400,
			showTotalPages: true,
		};
	};

	return {
		onGenerate,
		onMouseDown: () => {},
		onMouseMove: () => {},
		onMouseUp: () => {},
	};
};

export default ReportPageNumberComponentEvent;
