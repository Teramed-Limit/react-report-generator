import React from 'react';

import Konva from 'konva';

import { useMarkerNode } from '../../../../hooks/useMarkerNode.ts';
import { MarkerType } from '../../../../types/canvas/canvas-maker-attribute.ts';
import MarkerNode from '../../MarkerNode/MarkerNode';
import { MarkerMapper, NodeEnableMapper } from '../marker-mapper';

interface Props {
	id: string;
	markerType: MarkerType;
	attribute: Konva.ShapeConfig;
	isSelected: boolean;
	onMarkerSelect: (id: string) => void;
	onUpdateAttr: (id: string, attr: Konva.ShapeConfig) => void;
}

function RenderMaker({ id, markerType, attribute, isSelected, onMarkerSelect, onUpdateAttr }: Props) {
	const { shapeRef, nodeRef } = useMarkerNode<Konva.Shape>(isSelected);
	const RenderComponent = MarkerMapper[markerType] as React.ComponentType<any>;
	return (
		<>
			<RenderComponent
				ref={shapeRef}
				id={id}
				attribute={attribute}
				isSelected={isSelected}
				onSelect={onMarkerSelect}
				onUpdateAttr={onUpdateAttr}
			/>
			{isSelected && NodeEnableMapper[markerType] ? (
				<MarkerNode ref={nodeRef} id={id} onUpdateAttr={onUpdateAttr} />
			) : null}
		</>
	);
}

export default RenderMaker;
