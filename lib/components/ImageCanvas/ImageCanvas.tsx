import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';

import cx from 'classnames';
import Konva from 'konva';

import { useElementSize } from '../../hooks/useElementSize.tsx';
import Canvas from '../../konva-comp/Canvas/Canvas.tsx';
import { CanvasMarker, MarkerType, PositionMarker } from '../../types/canvas/canvas-maker-attribute.ts';

import classes from './ImageCanvas.module.scss';

interface Props<T = unknown> {
	imageSrc: string;
	initMarkers?: CanvasMarker<Konva.ShapeConfig>[];
	positionMarkers?: PositionMarker<T>[];
	dropDataKey?: string;
	resolveDropData?: (e: React.DragEvent<HTMLDivElement>) => T | null;
	onMarkerPlace?: (marker: PositionMarker<T>) => void;
	disabled?: boolean;
}

export interface ImageCanvasHandle {
	onExport(): string;
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
function ImageCanvasInner<T = unknown>(
	{
		imageSrc,
		initMarkers = [],
		positionMarkers = [],
		dropDataKey,
		resolveDropData,
		onMarkerPlace,
		disabled = false,
	}: Props<T>,
	ref: React.Ref<ImageCanvasHandle>,
) {
	type CanvasHandle = React.ElementRef<typeof Canvas>;
	const canvasRef = useRef<CanvasHandle>(null as unknown as CanvasHandle);
	const containerRef = useRef(null);
	const { size } = useElementSize(containerRef);

	const [isDragOver, setIsDragOver] = useState(false);

	// No-op setters for Canvas (initMarkers are read-only)
	const noopSetMarkers = useCallback(() => {}, []);
	const noopSetSelectId = useCallback(() => {}, []);

	useImperativeHandle(
		ref,
		() => ({
			onExport(): string {
				return canvasRef.current?.onExport() || '';
			},
		}),
		[],
	);

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		if (disabled) return;
		e.preventDefault();
		e.dataTransfer.dropEffect = 'copy';
		setIsDragOver(true);
	};

	const handleDragLeave = () => {
		setIsDragOver(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragOver(false);
		if (disabled) return;

		// Resolve drop data from external source
		let dropData: T | null = null;
		if (resolveDropData) {
			dropData = resolveDropData(e);
		} else if (dropDataKey) {
			const raw = e.dataTransfer.getData(dropDataKey);
			if (!raw) return;
			try {
				dropData = JSON.parse(raw) as T;
			} catch {
				dropData = raw as T;
			}
		}
		if (dropData == null) return;

		const stage = canvasRef.current?.getStage();
		if (!stage) return;

		const stageRect = stage.container().getBoundingClientRect();
		const scaleX = stage.scaleX();
		const scaleY = stage.scaleY();
		const pointX = (e.clientX - stageRect.left) / scaleX;
		const pointY = (e.clientY - stageRect.top) / scaleY;

		// Check if a mappingNumber was provided via dataTransfer
		const dropMappingNumber = Number(e.dataTransfer.getData('mappingNumber'));
		const existing =
			!Number.isNaN(dropMappingNumber) && dropMappingNumber > 0
				? positionMarkers.find((pm) => pm.mappingNumber === dropMappingNumber)
				: undefined;

		if (existing) {
			// Duplicate key: update position only
			onMarkerPlace?.({ ...existing, pointX, pointY });
		} else {
			// New marker: assign next mappingNumber
			const maxNumber = positionMarkers.reduce((max, pm) => Math.max(max, pm.mappingNumber), 0);
			onMarkerPlace?.({ mappingNumber: maxNumber + 1, pointX, pointY, data: dropData });
		}
	};

	return (
		<div
			ref={containerRef}
			className={cx(classes.container, { [classes.dropActive]: isDragOver })}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			style={{ pointerEvents: disabled ? 'none' : 'auto' }}
		>
			<Canvas
				ref={canvasRef}
				mainColor=""
				subColor=""
				markerType={MarkerType.None}
				canvasMarkers={initMarkers}
				setCanvasMarkers={noopSetMarkers}
				selectMarkerId=""
				setSelectMarkerId={noopSetSelectId}
				containerWidth={size.width}
				containerHeight={size.height}
				imageSrc={imageSrc}
				positionMarkers={positionMarkers}
			/>
		</div>
	);
}

export const ImageCanvas = forwardRef(ImageCanvasInner) as <T = unknown>(
	props: Props<T> & { ref?: React.Ref<ImageCanvasHandle> },
) => React.ReactElement | null;
