import React from 'react';

import { RepImageComponent } from '../../../../types/report-generator/component/rep-image-component.ts';
import { ReportComponentProps } from '../../report-component-props.tsx';

const ReportDynamicImageComponent = React.forwardRef<HTMLImageElement, ReportComponentProps<RepImageComponent>>(
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
		}: ReportComponentProps<RepImageComponent>,
		ref,
	) => {
		return (
			<>
				<img
					draggable="false"
					ref={ref}
					style={{
						...style,
						width: component.width * scale,
						height: component.height * scale,
						objectFit: 'contain',
					}}
					onClick={onClick}
					onMouseDown={onMouseDown}
					onMouseMove={onMouseMove}
					onMouseUp={onMouseUp}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					src={component.src}
					alt=""
				/>
			</>
		);
	},
);

ReportDynamicImageComponent.displayName = 'ReportDynamicImageComponent';

export default ReportDynamicImageComponent;
