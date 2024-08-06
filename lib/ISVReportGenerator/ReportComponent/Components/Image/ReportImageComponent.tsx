import React, { useState } from 'react';

import { RepImageComponent } from '../../../../types/report-generator/component/rep-image-component.ts';
import { readBase64 } from '../../../../utils/general.ts';
import { ReportComponentProps } from '../../report-component-props.tsx';

const ReportImageComponent = React.forwardRef<HTMLImageElement, ReportComponentProps<RepImageComponent>>(
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
			onValueChanged,
			onActive,
		}: ReportComponentProps<RepImageComponent>,
		ref,
	) => {
		const hiddenFileInput = React.useRef<HTMLInputElement>(null);
		const [imageSrc, setImageSrc] = useState<string>(component.src);

		const uploadFile = (e) => {
			stopPropagation(e);
			onActive(component, true);
			hiddenFileInput?.current?.click();
		};

		const handleFileChange = (event) => {
			const fileSelected = event.target.files[0];
			if (!fileSelected) return;
			readBase64(fileSelected).then((base64Str) => {
				setImageSrc(base64Str);
				onValueChanged(component.uuid, ['src'], base64Str);
			});
		};

		const stopPropagation = (e) => {
			e.preventDefault();
			e.stopPropagation();
		};

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
					src={imageSrc}
					alt=""
				/>
				<input
					ref={hiddenFileInput}
					type="file"
					accept="image/*"
					multiple={false}
					style={{ display: 'none' }}
					onChange={handleFileChange}
				/>
				<button
					type="button"
					onClick={uploadFile}
					onMouseDown={stopPropagation}
					onMouseUp={stopPropagation}
					style={{
						left: style.left,
						top: style.top,
						position: style.position,
						zIndex: 1000,
					}}
				>
					...
				</button>
			</>
		);
	},
);

ReportImageComponent.displayName = 'ReportImageComponent';
export default ReportImageComponent;
