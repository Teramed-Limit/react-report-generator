import React, { forwardRef, MutableRefObject } from 'react';

import Konva from 'konva';
import { Arrow } from 'react-konva';

import { useMarkerEvent } from '../../../../hooks/useMarkerEvent.ts';
import { RenderMarkerProps } from '../RenderMarkerProps.ts';

const ArrowMarker = forwardRef<Konva.Arrow, RenderMarkerProps<Konva.ArrowConfig>>(
	({ id, attribute, isSelected, onSelect, onUpdateAttr }, shapeRef) => {
		const { onClick, onDragStart, onDragEnd, onMouseDown, onMouseLeave, onMouseEnter } = useMarkerEvent(
			id,
			isSelected,
			(shapeRef as MutableRefObject<Konva.Arrow>).current,
			onSelect,
			onUpdateAttr,
		);

		return (
			<Arrow
				ref={shapeRef}
				x={attribute.x}
				y={attribute.y}
				rotation={attribute.rotation}
				scaleX={attribute.scaleX}
				scaleY={attribute.scaleY}
				dash={[10, 5]}
				dashEnabled={attribute.dashEnabled}
				points={attribute.points}
				pointerLength={attribute.pointerLength}
				pointerWidth={attribute.pointerWidth}
				fill={attribute.fill}
				stroke={attribute.stroke}
				strokeWidth={attribute.strokeWidth}
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

ArrowMarker.displayName = 'ArrowMarker';
export default ArrowMarker;
