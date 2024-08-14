import React, { useEffect } from 'react';

import { RepLineComponent } from '../../../../types/report-generator/component/rep-line-component.ts';
import { ReportComponentProps } from '../../report-component-props.tsx';

const ReportLineComponent = React.forwardRef<HTMLCanvasElement, ReportComponentProps<RepLineComponent>>(
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
		}: ReportComponentProps<RepLineComponent>,
		ref,
	) => {
		useEffect(() => {
			if (!ref) return;
			const canvas = (ref as React.MutableRefObject<HTMLCanvasElement>).current;
			const ctx = canvas.getContext('2d');

			if (!ctx) return;
			ctx.clearRect(0, 0, component.width * scale, component.height * scale);
			ctx.beginPath();
			ctx.moveTo(component.x1 * scale, component.y1 * scale);
			ctx.lineTo(component.x2 * scale, component.y2 * scale);
			ctx.lineWidth = component.thickness;
			ctx.strokeStyle = component.color;
			ctx.stroke();
		}, [
			component.color,
			component.height,
			component.thickness,
			component.width,
			component.x1,
			component.x2,
			component.y1,
			component.y2,
			ref,
			scale,
		]);

		return (
			<canvas
				ref={ref}
				width={component.width * scale}
				height={component.height * scale}
				style={{ ...style, stroke: component.color }}
				onClick={onClick}
				onMouseDown={onMouseDown}
				onMouseMove={onMouseMove}
				onMouseUp={onMouseUp}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			/>
		);
	},
);

ReportLineComponent.displayName = 'ReportLineComponent';
export default React.memo(ReportLineComponent);
