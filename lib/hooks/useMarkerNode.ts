import React from 'react';

import Konva from 'konva';

export function useMarkerNode<T extends Konva.Shape>(isSelected = false) {
	const shapeRef = React.useRef<T | null>(null);
	const nodeRef = React.useRef<Konva.Transformer | null>(null);

	React.useEffect(() => {
		if (isSelected && nodeRef.current && shapeRef.current) {
			if (nodeRef.current instanceof Konva.Transformer) {
				nodeRef.current.nodes([shapeRef.current as Konva.Node]);
				nodeRef.current.getLayer()?.batchDraw();
			} else {
				console.error('nodeRef.current is not an instance of Konva.Transformer');
			}
		}
	}, [isSelected]);

	return { shapeRef, nodeRef };
}
