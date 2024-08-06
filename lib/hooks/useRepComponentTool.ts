import React, { useEffect, useState } from 'react';

import ReportDynamicImageComponentEvent from '../ISVReportGenerator/ReportComponent/Components/DynamicImage/ReportDynamicImageComponentEvent.ts';
import ReportDynamicLabelComponentEvent from '../ISVReportGenerator/ReportComponent/Components/DynamicLabel/ReportDynamicLabelComponentEvent.ts';
import ReportGeneralEvent from '../ISVReportGenerator/ReportComponent/Components/General/ReportGeneralEvent.ts';
import ReportImageComponentEvent from '../ISVReportGenerator/ReportComponent/Components/Image/ReportImageComponentEvent.ts';
import ReportLabelComponentEvent from '../ISVReportGenerator/ReportComponent/Components/Label/ReportLabelComponentEvent.ts';
import ReportLineComponentEvent from '../ISVReportGenerator/ReportComponent/Components/Line/ReportLineComponentEvent.ts';
import ReportPageNumberComponentEvent from '../ISVReportGenerator/ReportComponent/Components/PageNumber/ReportPageNumberComponentEvent.ts';
import { RepComponent, ReportComponentType } from '../types/report-generator/component/rep-component';
import { Point } from '../types/report-generator/rep-report.ts';

const ToolMouseEventMapper = {
	[ReportComponentType.General]: ReportGeneralEvent,
	[ReportComponentType.Label]: ReportLabelComponentEvent,
	[ReportComponentType.Image]: ReportImageComponentEvent,
	[ReportComponentType.DynamicImage]: ReportDynamicImageComponentEvent,
	[ReportComponentType.DynamicLabel]: ReportDynamicLabelComponentEvent,
	[ReportComponentType.Line]: ReportLineComponentEvent,
	[ReportComponentType.PageNumber]: ReportPageNumberComponentEvent,
};

export function useRepComponentTool(compType: ReportComponentType = ReportComponentType.General): {
	onGenerate: (e: React.MouseEvent, pos: Point) => RepComponent;
	onMouseDown: (e: React.MouseEvent) => void;
	onMouseMove: (e: React.MouseEvent) => void;
	onMouseUp: (e: React.MouseEvent) => void;
} {
	const [event, setEvent] = useState(ToolMouseEventMapper[compType] as any);

	useEffect(() => {
		setEvent(ToolMouseEventMapper[compType]);
	}, [compType]);

	return {
		onGenerate: event.onGenerate,
		onMouseDown: event.onMouseDown,
		onMouseMove: event.onMouseMove,
		onMouseUp: event.onMouseUp,
	};
}
