import React, { useEffect, useRef, useState } from 'react';

import { Box, Button } from '@mui/material';
import Konva from 'konva';
import * as R from 'ramda';

import AttributeList from '../../attribute/AttributeList/AttributeList.tsx';
import { useElementSize } from '../../hooks/useElementSize.tsx';
import useLocalStorage from '../../hooks/useLocalStorage.ts';
import Canvas from '../../konva-comp/Canvas/Canvas.tsx';
import CanvasOverlay from '../../konva-comp/CanvasOvelay/CanvasOverlay.tsx';
import CanvasToolbar from '../../konva-comp/CanvasToolbar/CanvasToolbar.tsx';
import { CanvasMarker, MarkerType } from '../../types/canvas/canvas-maker-attribute.ts';
import ColorPickerButton from '../../UI/ColorPickerButton/ColorPickerButton.tsx';
import { generateUUID, isEmptyOrNil } from '../../utils/general.ts';
import classes from './ImageCanvasModal.module.scss';

interface Props {
	imageSrc: string;
	initMarkers: CanvasMarker<Konva.ShapeConfig>[];
	onExportCanvas?: (canvasMarkers: CanvasMarker<Konva.ShapeConfig>[], base64: string) => void;
}

function ImageCanvasModal({ imageSrc, initMarkers, onExportCanvas }: Props) {
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

	const onConfirm = () => {
		setSelectMarkerId('');
		if (!canvasRef.current) return;
		onExportCanvas?.(canvasMarkers, canvasRef.current.onExport() || '');
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

	const onMarkerDelete = (markerId: string) => {
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
		<>
			<div className={classes.container}>
				<div className={classes.leftPanel}>
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
						deleteMarker={onMarkerDelete}
						copyMarker={onMarkerCopy}
					/>
				</div>
				<div ref={targetRef} className={classes.middlePanel}>
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
					/>
				</div>
				<div className={classes.rightPanel}>
					{selectMarkerAttrs ? (
						<div className={classes.attributeContainer}>
							<AttributeList
								attribute={selectMarkerAttrs}
								attributeComponentMapper={{
									fill: ColorPickerButton,
									stroke: ColorPickerButton,
								}}
								filterType="include"
								includeAttribute={[
									// 'width',
									// 'height',
									'text',
									'fill',
									'stroke',
									'fontSize',
									'radius',
									'strokeWidth',
									'pointerLength',
									'pointerWidth',
									// 'scaleX',
									// 'scaleY',
									// 'rotation',
									// 'x',
									// 'y',
									'dashEnabled',
								]}
								setAttribute={setAttribute}
							/>
						</div>
					) : null}
				</div>
			</div>
			<Box sx={{ alignSelf: 'end' }}>
				<Button variant="contained" onClick={() => onConfirm()}>
					Confirm
				</Button>
			</Box>
		</>
	);
}

export default ImageCanvasModal;
