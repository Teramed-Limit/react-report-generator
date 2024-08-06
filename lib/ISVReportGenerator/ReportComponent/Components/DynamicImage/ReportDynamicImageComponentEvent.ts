import React from 'react';

import { ReportComponentType } from '../../../../types/report-generator/component/rep-component.ts';
import { RepImageComponent } from '../../../../types/report-generator/component/rep-image-component.ts';
import { Point } from '../../../../types/report-generator/rep-report.ts';
import { generateUUID } from '../../../../utils/general.ts';

const ReportDynamicImageComponentEvent = (): {
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
			componentType: ReportComponentType.DynamicImage,
			width: 50,
			height: 50,
			src: 'SignatureImage',
		};
	};

	return {
		onGenerate,
		onMouseDown: () => {},
		onMouseMove: () => {},
		onMouseUp: () => {},
	};
};

export default ReportDynamicImageComponentEvent;
