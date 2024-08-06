import React from 'react';

import { RepPageNumberComponent } from '../../../../types/report-generator/component/rep-page-num-component.ts';
import { ReportComponentProps } from '../../report-component-props.tsx';

const ReportPageNumberComponent = React.forwardRef<HTMLDivElement, ReportComponentProps<RepPageNumberComponent>>(
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
		}: ReportComponentProps<RepPageNumberComponent>,
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
				{`1${component.showTotalPages ? '/1' : ''}`}
			</div>
		);
	},
);

ReportPageNumberComponent.displayName = 'ReportPageNumberComponent';
export default React.memo(ReportPageNumberComponent);
