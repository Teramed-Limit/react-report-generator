import React from 'react';

import { RepLabelComponent } from '../../../../types/report-generator/component/rep-label-component.ts';
import { ReportComponentProps } from '../../report-component-props.tsx';

const ReportLabelComponent = React.forwardRef<HTMLDivElement, ReportComponentProps<RepLabelComponent>>(
	(
		{
			style,
			scale,
			component,
			onClick,
			onMouseDown,
			onMouseMove,
			onMouseUp,
			onMouseEnter,
			onMouseLeave,
		}: ReportComponentProps<RepLabelComponent>,
		ref,
	) => {
		return (
			<div
				ref={ref}
				style={{
					...style,
					fontSize: `${component.fontSize * scale}px`,
					fontFamily: component.fontName || 'Arial',
					fontWeight: component.fontWeight,
					fontStyle: component.fontStyle,
					color: component.fontColor,
					whiteSpace: 'nowrap',
				}}
				onClick={onClick}
				onMouseDown={onMouseDown}
				onMouseMove={onMouseMove}
				onMouseUp={onMouseUp}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				{component.value}
			</div>
		);
	},
);

ReportLabelComponent.displayName = 'ReportLabelComponent';

export default React.memo(ReportLabelComponent);
