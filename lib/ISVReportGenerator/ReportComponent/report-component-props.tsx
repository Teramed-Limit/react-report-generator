import React, { CSSProperties } from 'react';

import { RepComponent } from '../../types/report-generator/component/rep-component.ts';

export interface ReportComponentProps<T = any> {
	style: CSSProperties;
	scale: number;
	component: T;
	onClick: (e: React.MouseEvent) => void;
	onMouseDown: (e: React.MouseEvent) => void;
	onMouseMove: (e: React.MouseEvent) => void;
	onMouseUp: (e: React.MouseEvent) => void;
	onMouseEnter: (e: React.MouseEvent) => void;
	onMouseLeave: (e: React.MouseEvent) => void;
	onValueChanged: (uuid: string, attrPath: (string | number)[], value: string) => void;
	onActive: (comp: RepComponent, deactivateOthers: boolean) => void;
}
