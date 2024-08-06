import React, { forwardRef } from 'react';

import Konva from 'konva';
import { Line } from 'react-konva';

import { RenderMarkerProps } from '../RenderMarkerProps.ts';

const FreeDrawLineMarker = forwardRef<Konva.Line, RenderMarkerProps<Konva.LineConfig>>(({ id, attribute }, ref) => {
	return (
		<Line
			id={id.toString()}
			points={attribute.points}
			stroke={attribute.stroke}
			strokeWidth={attribute.strokeWidth}
			tension={0.5}
			lineCap="round"
			globalCompositeOperation="source-over"
		/>
	);
});

FreeDrawLineMarker.displayName = 'FreeDrawLineMarker';
export default FreeDrawLineMarker;
