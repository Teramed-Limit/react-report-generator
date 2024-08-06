import React from 'react';

import { ReportComponentType } from '../../../../types/report-generator/component/rep-component.ts';
import { RepImageComponent } from '../../../../types/report-generator/component/rep-image-component.ts';
import { Point } from '../../../../types/report-generator/rep-report.ts';
import { generateUUID } from '../../../../utils/general';

const ReportImageComponentEvent = (): {
	onGenerate: (e: React.MouseEvent, pos: Point) => RepImageComponent;
	onMouseUp: () => void;
	onMouseMove: () => void;
	onMouseDown: () => void;
} => {
	const onGenerate = (e: React.MouseEvent, pos: Point) => {
		return {
			uuid: generateUUID(),
			x: pos.x,
			y: pos.y,
			componentType: ReportComponentType.Image,
			width: 50,
			height: 50,
			src: 'https://picsum.photos/200',
		};
	};

	return {
		onGenerate,
		onMouseDown: () => {},
		onMouseMove: () => {},
		onMouseUp: () => {},
	};
};

export default ReportImageComponentEvent;
