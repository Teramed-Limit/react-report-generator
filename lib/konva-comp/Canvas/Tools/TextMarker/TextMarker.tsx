import { forwardRef, MutableRefObject, useEffect } from 'react';

import Konva from 'konva';
import { Text } from 'react-konva';

import { useMarkerEvent } from '../../../../hooks/useMarkerEvent';
import { RenderMarkerProps } from '../RenderMarkerProps.ts';

const TextMarker = forwardRef<Konva.Text, RenderMarkerProps<Konva.TextConfig>>(
	({ id, attribute, isSelected, onSelect, onUpdateAttr }: RenderMarkerProps<Konva.TextConfig>, shapeRef) => {
		const { onClick, onDragStart, onDragEnd, onMouseDown, onMouseLeave, onMouseEnter } = useMarkerEvent(
			id,
			isSelected,
			(shapeRef as MutableRefObject<Konva.Text>).current,
			onSelect,
			onUpdateAttr,
		);

		useEffect(() => {
			if (!isSelected) return;

			const textNode = (shapeRef as MutableRefObject<Konva.Text>)?.current;
			if (!textNode) return;

			const stage = textNode.getStage();
			if (!stage) return;

			const handleKeyDown = (e: KeyboardEvent) => {
				if (e.key.length !== 1 && e.key !== 'Backspace' && e.key !== 'Delete') {
					return;
				}

				let currentText = attribute.text ?? '';

				if (e.key === 'Backspace') {
					currentText = currentText.slice(0, -1);
				} else if (e.key === 'Delete') {
					currentText = '';
				} else {
					currentText += e.key;
				}

				onUpdateAttr(id, {
					...attribute,
					text: currentText,
				});
			};

			const container = stage.container();
			container.tabIndex = 1;
			container.addEventListener('keydown', handleKeyDown);

			return () => {
				container.removeEventListener('keydown', handleKeyDown);
			};
		}, [isSelected, shapeRef, id, attribute, onUpdateAttr]);

		useEffect(() => {
			if (isSelected) {
				(shapeRef as MutableRefObject<Konva.Text>)?.current?.fire('click');
			}
		}, [isSelected, shapeRef]);

		return (
			<>
				<Text
					ref={shapeRef}
					text={attribute.text}
					x={attribute.x}
					y={attribute.y}
					rotation={attribute.rotation}
					scaleX={attribute.scaleX}
					scaleY={attribute.scaleY}
					fontSize={attribute.fontSize}
					draggable={isSelected}
					fill={attribute.fill}
					stroke={attribute.stroke}
					onMouseLeave={onMouseLeave}
					onMouseEnter={onMouseEnter}
					onMouseDown={(e) => onMouseDown(e)}
					onClick={(e) => {
						onClick(e);
					}}
					onDragStart={onDragStart}
					onDragEnd={onDragEnd}
					fontFamily="Tahoma"
					fontStyle="Normal"
					fontWeight="Normal"
				/>
			</>
		);
	},
);

TextMarker.displayName = 'TextMarker';

export default TextMarker;
