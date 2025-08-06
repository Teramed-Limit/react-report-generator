import React from 'react';

import { RepComponent } from '../../../../types/report-generator/component/rep-component.ts';
import { Point } from '../../../../types/report-generator/rep-report.ts';

const ReportGeneralEvent = (): {
	onGenerate: (e: React.MouseEvent, pos: Point) => RepComponent | null;
	onMouseUp: () => void;
	onMouseMove: () => void;
	onMouseDown: () => void;
} => {
	const onGenerate = (e: React.MouseEvent, pos: Point) => {
		return null;
	};

	return {
		onGenerate,
		onMouseDown: () => {},
		onMouseMove: () => {},
		onMouseUp: () => {},
	};
};

export default ReportGeneralEvent;
