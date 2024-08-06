import React, { forwardRef, MutableRefObject } from 'react';

import Konva from 'konva';
import { Circle } from 'react-konva';

import { useMarkerEvent } from '../../../../hooks/useMarkerEvent';
import { RenderMarkerProps } from '../RenderMarkerProps.ts';

const CircleMarker = forwardRef<Konva.Circle, RenderMarkerProps<Konva.CircleConfig>>(
	({ id, attribute, isSelected, onSelect, onUpdateAttr }, shapeRef) => {
		const { onClick, onDragStart, onDragEnd, onMouseDown, onMouseLeave, onMouseEnter } = useMarkerEvent(
			id,
			isSelected,
			(shapeRef as MutableRefObject<Konva.Circle>).current,
			onSelect,
			onUpdateAttr,
		);

		return (
			<Circle
				ref={shapeRef}
				x={attribute.x}
				y={attribute.y}
				radius={attribute.radius}
				rotation={attribute.rotation}
				scaleX={attribute.scaleX}
				scaleY={attribute.scaleY}
				fill={attribute.fill}
				stroke={attribute.stroke}
				strokeWidth={attribute.strokeWidth}
				draggable={isSelected}
				onMouseDown={onMouseDown}
				onMouseLeave={onMouseLeave}
				onMouseEnter={onMouseEnter}
				onClick={onClick}
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
			/>
		);
	},
);

CircleMarker.displayName = 'CircleMarker';

export default CircleMarker;
