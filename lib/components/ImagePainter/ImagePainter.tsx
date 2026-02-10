import React, { useEffect, useRef, useState } from 'react';

import { Box, Button } from '@mui/material';
import cx from 'classnames';
import Konva from 'konva';
import * as R from 'ramda';

import AttributeList from '../../attribute/AttributeList/AttributeList.tsx';
import { useElementSize } from '../../hooks/useElementSize.tsx';
import useLocalStorage from '../../hooks/useLocalStorage.ts';
import Canvas from '../../konva-comp/Canvas/Canvas.tsx';
import CanvasOverlay from '../../konva-comp/CanvasOvelay/CanvasOverlay.tsx';
import CanvasToolbar from '../../konva-comp/CanvasToolbar/CanvasToolbar.tsx';
import { CanvasMarker, MarkerType, PositionMarker } from '../../types/canvas/canvas-maker-attribute.ts';
import ColorPickerButton from '../../UI/ColorPickerButton/ColorPickerButton.tsx';
import { generateUUID, isEmptyOrNil } from '../../utils/general.ts';

import classes from './ImagePainter.module.scss';

interface Props<T = unknown> {
	imageSrc: string;
	initMarkers: CanvasMarker<Konva.ShapeConfig>[];
	onCancel: () => void;
	onExportCanvas?: (canvasMarkers: CanvasMarker<Konva.ShapeConfig>[], base64: string) => void;
	actionButton?: React.ReactNode;
	positionMarkers?: PositionMarker<T>[];
	dropDataKey?: string;
	resolveDropData?: (e: React.DragEvent<HTMLDivElement>) => T | null;
	onMarkerPlace?: (marker: PositionMarker<T>) => void;
}

export function ImagePainter<T = unknown>({
	imageSrc,
	initMarkers,
	onCancel,
	onExportCanvas,
	actionButton,
	positionMarkers = [],
	dropDataKey,
	resolveDropData,
	onMarkerPlace,
}: Props<T>) {
	type CanvasHandle = React.ElementRef<typeof Canvas>;
	const canvasRef = useRef<CanvasHandle>(null as unknown as CanvasHandle);
	const targetRef = useRef(null);
	// Use custom hook to get the size of the element
	const { size } = useElementSize(targetRef);

	const [markerType, setMarkerType] = React.useState<MarkerType>(MarkerType.None);
	const [selectMarkerId, setSelectMarkerId] = useState('');
	const [canvasMarkers, setCanvasMarkers] = React.useState<CanvasMarker<Konva.ShapeConfig>[]>(initMarkers);
	const [mainColor, setMainColor] = useLocalStorage('canvas_mainColor', 'rgba(0, 0, 0, 1)');
	const [subColor, setSubColor] = useLocalStorage('canvas_subColor', 'rgba(0, 0, 0, 0)');

	const [selectMarkerAttrs, setSelectMarkerAttrs] = useState<Konva.ShapeConfig | undefined>(undefined);
	const [isDragOver, setIsDragOver] = useState(false);

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
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

	const onConfirm = () => {
		setSelectMarkerId('');
		if (!canvasRef.current) return;
		setSelectMarkerAttrs(undefined);
		setTimeout(() => {
			onExportCanvas?.(canvasMarkers, canvasRef.current.onExport() || '');
		});
	};

	useEffect(() => {
		const selectMarker = canvasMarkers.find((marker) => marker.id === selectMarkerId);
		if (!selectMarker) return;
		setSelectMarkerAttrs(selectMarker.attribute);
	}, [canvasMarkers, selectMarkerId]);

	const handleCanvasTool = (event: React.MouseEvent<HTMLElement>, newFormat: string) => {
		if (!MarkerType[newFormat]) {
			console.error('tool not implemented!');
			return;
		}

		setMarkerType(MarkerType[newFormat]);
	};

	const handleCanvasMarkerDelete = (markerId: string) => {
		setCanvasMarkers((value) => value.filter((marker) => marker.id !== markerId));
	};

	const onMarkerCopy = (markerId: string) => {
		const copyMarker = canvasMarkers.find((marker) => marker.id === markerId);
		if (!copyMarker) return;

		setCanvasMarkers((value) => {
			const uuid = generateUUID();
			value.push({
				...copyMarker,
				name: `${markerType}`,
				id: uuid,
			});
			return value.slice();
		});
	};

	const setAttribute = (attrPath: (number | string)[], attrValue: number | string | boolean) => {
		if (isEmptyOrNil(selectMarkerId)) return;
		setCanvasMarkers((markers) => {
			return markers.map((marker) => {
				if (marker.id === selectMarkerId) {
					return R.assocPath(['attribute', ...attrPath], attrValue, marker);
				}
				return marker;
			});
		});
	};

	return (
		<div className={classes.container}>
			{/* Left Panel - Tools & Layers */}
			<div className={classes.leftPanel}>
				<div className={classes.panelHeader}>
					<span className={classes.panelTitle}>Tools</span>
				</div>
				<CanvasToolbar
					markerType={markerType}
					setCanvasTool={handleCanvasTool}
					mainColor={mainColor}
					setMainColor={setMainColor}
					subColor={subColor}
					setSubColor={setSubColor}
				/>
				<CanvasOverlay
					canvasMarkers={canvasMarkers}
					selectMarkerId={selectMarkerId}
					setCanvasMarkers={setCanvasMarkers}
					setSelectMarkerId={setSelectMarkerId}
					deleteMarker={handleCanvasMarkerDelete}
					copyMarker={onMarkerCopy}
				/>
			</div>

			{/* Middle Panel - Canvas */}
			<div
				ref={targetRef}
				className={cx(classes.middlePanel, { [classes.dropActive]: isDragOver })}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
			>
				<Canvas
					ref={canvasRef}
					mainColor={mainColor}
					subColor={subColor}
					markerType={markerType}
					canvasMarkers={canvasMarkers}
					setCanvasMarkers={setCanvasMarkers}
					selectMarkerId={selectMarkerId}
					setSelectMarkerId={setSelectMarkerId}
					containerWidth={size.width}
					containerHeight={size.height}
					imageSrc={imageSrc}
					positionMarkers={positionMarkers}
				/>
			</div>

			{/* Right Panel - Properties */}
			<div className={classes.rightPanel}>
				<div className={classes.panelHeader}>
					<span className={classes.panelTitle}>Properties</span>
				</div>
				<div className={classes.attributeContainer}>
					{selectMarkerAttrs ? (
						<AttributeList
							attribute={selectMarkerAttrs}
							attributeComponentMapper={{
								fill: ColorPickerButton,
								stroke: ColorPickerButton,
							}}
							filterType="include"
							includeAttribute={[
								'text',
								'fill',
								'stroke',
								'fontSize',
								'radius',
								'strokeWidth',
								'pointerLength',
								'pointerWidth',
								'dashEnabled',
							]}
							setAttribute={setAttribute}
						/>
					) : (
						<Box sx={{ p: 2, color: '#808080', fontSize: '12px', textAlign: 'center' }}>
							Select an element to edit properties
						</Box>
					)}
				</div>
				<div className={classes.actionBar}>
					{actionButton}
					<Button variant="contained" color="error" size="small" onClick={() => onCancel()}>
						Discard
					</Button>
					<Button variant="contained" color="primary" size="small" onClick={() => onConfirm()}>
						Save
					</Button>
				</div>
			</div>
		</div>
	);
}
