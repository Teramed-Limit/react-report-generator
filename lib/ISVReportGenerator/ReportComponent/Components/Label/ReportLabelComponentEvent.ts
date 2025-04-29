import React from 'react';

import { ReportComponentType } from '../../../../types/report-generator/component/rep-component.ts';
import { RepLabelComponent } from '../../../../types/report-generator/component/rep-label-component.ts';
import { Point } from '../../../../types/report-generator/rep-report.ts';
import { generateUUID } from '../../../../utils/general.ts';

const ReportLabelComponentEvent = (): {
	onGenerate: (e: React.MouseEvent, pos: Point) => RepLabelComponent;
	onMouseUp: () => void;
	onMouseMove: () => void;
	onMouseDown: () => void;
} => {
	const onGenerate = (e: React.MouseEvent, pos: Point): RepLabelComponent => {
		return {
			uuid: generateUUID(),
			x: pos.x,
			y: pos.y,
			componentType: ReportComponentType.Label,
			valueType: 'string',
			value: 'Label',
			fontSize: 16,
			fontName: 'Arial',
			fontStyle: 'normal',
			fontColor: 'black',
			fontWeight: 400,
			suffix: '',
			prefix: '',
		};
	};
	return {
		onGenerate,
		onMouseDown: () => {},
		onMouseMove: () => {},
		onMouseUp: () => {},
	};
};

export default ReportLabelComponentEvent;
