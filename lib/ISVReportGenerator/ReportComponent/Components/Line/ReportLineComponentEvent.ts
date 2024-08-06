import React from 'react';

import { ReportComponentType } from '../../../../types/report-generator/component/rep-component.ts';
import { RepLineComponent } from '../../../../types/report-generator/component/rep-line-component.ts';
import { Point } from '../../../../types/report-generator/rep-report.ts';
import { generateUUID } from '../../../../utils/general.ts';

const ReportLineComponentEvent = (): {
	onGenerate: (e: React.MouseEvent, pos: Point) => RepLineComponent;
	onMouseUp: () => void;
	onMouseMove: () => void;
	onMouseDown: () => void;
} => {
	const onGenerate = (e: React.MouseEvent, pos: Point) => {
		return {
			uuid: generateUUID(),
			componentType: ReportComponentType.Line,
			width: 585,
			height: 10,
			x: pos.x,
			y: pos.y,
			x1: 0,
			y1: 10 / 2,
			x2: 585,
			y2: 10 / 2,
			color: '#000000',
			thickness: 2,
		};
	};

	return {
		onGenerate,
		onMouseDown: () => {},
		onMouseMove: () => {},
		onMouseUp: () => {},
	};
};

export default ReportLineComponentEvent;
