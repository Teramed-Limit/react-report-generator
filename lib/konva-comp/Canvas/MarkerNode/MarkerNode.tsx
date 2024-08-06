import React, { forwardRef } from 'react';

import Konva from 'konva';
import { Transformer } from 'react-konva';

interface Props {
	id: string;
	onUpdateAttr: (id: string, attr: Konva.ShapeConfig) => void;
}

const MarkerNode = forwardRef<Konva.Transformer, Props>(({ id, onUpdateAttr }, trRef) => {
	return (
		<Transformer
			ref={trRef}
			onTransformEnd={(e) => {
				onUpdateAttr(id, e.target.attrs);
			}}
			boundBoxFunc={(oldBox, newBox) => {
				// limit resize
				if (newBox.width < 5 || newBox.height < 5) {
					return oldBox;
				}
				return newBox;
			}}
		/>
	);
});

MarkerNode.displayName = 'MarkerNode';

export default MarkerNode;
