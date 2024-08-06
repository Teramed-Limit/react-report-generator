import React, { forwardRef, MutableRefObject } from 'react';

import Konva from 'konva';
import { Rect } from 'react-konva';

import { useMarkerEvent } from '../../../../hooks/useMarkerEvent';
import { RenderMarkerProps } from '../RenderMarkerProps.ts';

const SquareMarker = forwardRef<Konva.Rect, RenderMarkerProps<Konva.RectConfig>>(
	({ id, attribute, isSelected, onSelect, onUpdateAttr }, shapeRef) => {
		const { onClick, onDragStart, onDragEnd, onMouseDown, onMouseLeave, onMouseEnter } = useMarkerEvent(
			id,
			isSelected,
			(shapeRef as MutableRefObject<Konva.Rect>).current,
			onSelect,
			onUpdateAttr,
		);
		return (
			<Rect
				ref={shapeRef}
				x={attribute.x}
				y={attribute.y}
				rotation={attribute.rotation}
				scaleX={attribute.scaleX}
				scaleY={attribute.scaleY}
				width={attribute.width}
				height={attribute.height}
				strokeWidth={attribute.strokeWidth}
				fill={attribute.fill}
				stroke={attribute.stroke}
				draggable={isSelected}
				onMouseLeave={onMouseLeave}
				onMouseEnter={onMouseEnter}
				onMouseDown={onMouseDown}
				onClick={onClick}
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
			/>
		);
	},
);

SquareMarker.displayName = 'SquareMarker';

export default SquareMarker;
