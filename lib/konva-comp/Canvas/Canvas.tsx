import React, { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';

import Konva from 'konva';
import { Group, Image, Layer, Rect, Stage, Text } from 'react-konva';
import useImage from 'use-image';

import { useCanvasTool } from '../../hooks/useCanvasTool.ts';
import { CanvasMarker, MarkerType, PositionMarker } from '../../types/canvas/canvas-maker-attribute.ts';
import { isEmptyOrNil } from '../../utils/general';

import classes from './Canvas.module.scss';
import RenderMaker from './Tools/RenderMaker/RenderMaker';

type CanvasHandle = {
	onExport(): string;
	getStage(): Konva.Stage | null;
};

interface Props {
	mainColor: string;
	subColor: string;
	markerType: MarkerType;
	canvasMarkers: CanvasMarker<Konva.ShapeConfig>[];
	setCanvasMarkers: React.Dispatch<React.SetStateAction<CanvasMarker<Konva.ShapeConfig>[]>>;
	selectMarkerId: string;
	setSelectMarkerId: React.Dispatch<React.SetStateAction<string>>;
	imageSrc: string;
	containerWidth: number;
	containerHeight: number;
	positionMarkers?: PositionMarker[];
}

const Canvas = forwardRef<CanvasHandle, Props>(
	(
		{
			mainColor,
			subColor,
			canvasMarkers = [],
			markerType,
			setCanvasMarkers,
			selectMarkerId,
			setSelectMarkerId,
			imageSrc,
			containerWidth,
			containerHeight,
			positionMarkers = [],
		},
		ref,
	) => {
		const stageRef = useRef<Konva.Stage>(null as unknown as Konva.Stage);
		const imageRef = useRef<Konva.Image>(null as unknown as Konva.Image);
		const [image] = useImage(imageSrc, 'anonymous');
		const [isDrawing, setIsDrawing] = useState(false);
		// const [scaleX, setScale] = useState(1);
		const [scaleX, setScaleX] = useState(1);
		const [scaleY, setScaleY] = useState(1);
		const [canvasWidth, setCanvasWidth] = useState(containerWidth);
		const [canvasHeight, setCanvasHeight] = useState(containerHeight);
		const [canvasPosition] = useState({ x: 0, y: 0 });
		const { onClick, onMouseMove, onMouseUp, onMouseDown } = useCanvasTool(markerType);

		useImperativeHandle(
			ref,
			() => ({
				onExport(): string {
					if (!stageRef.current || !imageRef.current) return '';
					let ratio = 1;

					if (stageRef.current.height() < stageRef.current.width()) {
						ratio = imageRef.current.height() / stageRef.current.height();
					}

					if (stageRef.current.height() > stageRef.current.width()) {
						ratio = imageRef.current.width() / stageRef.current.width();
					}

					return stageRef.current.toDataURL({
						pixelRatio: ratio,
					});
				},
				getStage(): Konva.Stage | null {
					return stageRef.current;
				},
			}),
			[],
		);

		useEffect(() => {
			setSelectMarkerId('');
		}, [markerType, setSelectMarkerId]);

		useLayoutEffect(() => {
			if (!stageRef.current || !imageRef.current) {
				return;
			}

			const imageWidth = image?.naturalWidth || 0;
			const imageHeight = image?.naturalHeight || 0;

			if (imageWidth === 0 || imageHeight === 0) return;

			const imageRatio = imageWidth / imageHeight;
			const canvasRatio = containerWidth / containerHeight;

			let newWidth: number;
			let newHeight: number;

			// 根據畫布比率調整圖像尺寸
			if (imageRatio < canvasRatio) {
				newHeight = containerHeight;
				newWidth = imageWidth * (containerHeight / imageHeight);
			} else {
				newWidth = containerWidth;
				newHeight = imageHeight * (containerWidth / imageWidth);
			}

			setCanvasWidth(newWidth);
			setCanvasHeight(newHeight);

			// 計算縮放比例
			setScaleX(newWidth / imageWidth);
			setScaleY(newHeight / imageHeight);
		}, [canvasHeight, canvasWidth, containerHeight, containerWidth, image]);

		const updateMarkerAttr = (id: string, attr: Konva.ShapeConfig) => {
			setCanvasMarkers((markers) => {
				return markers.map((marker) => {
					if (marker.id === id) {
						return {
							...marker,
							attribute: { ...attr },
						};
					}
					return marker;
				});
			});
		};

		return (
			<Stage
				className={classes.canvas}
				x={canvasPosition.x || 0}
				y={canvasPosition.y || 0}
				ref={stageRef}
				scaleX={scaleX || 1}
				scaleY={scaleY || 1}
				width={canvasWidth || 0}
				height={canvasHeight || 0}
				onClick={(e: Konva.KonvaEventObject<MouseEvent>) => {
					e.evt.stopPropagation();
					setSelectMarkerId('');
					if (!isEmptyOrNil(selectMarkerId)) return;
					onClick(e, mainColor, subColor, canvasMarkers, setCanvasMarkers, setSelectMarkerId);
				}}
				onDbClick={(e: Konva.KonvaEventObject<MouseEvent>) => {
					e.evt.stopPropagation();
					setSelectMarkerId('');
				}}
				onMouseDown={(e: Konva.KonvaEventObject<MouseEvent>) => {
					if (!isEmptyOrNil(selectMarkerId)) return;
					if (e.evt.which === 1) {
						setIsDrawing(true);
						onMouseDown(e, mainColor, subColor, canvasMarkers, setCanvasMarkers, setSelectMarkerId);
					}
				}}
				onMouseMove={(e: Konva.KonvaEventObject<MouseEvent>) => {
					if (!isEmptyOrNil(selectMarkerId)) return;
					if (e.evt.which === 1 && isDrawing) {
						onMouseMove(e, mainColor, subColor, canvasMarkers, setCanvasMarkers, setSelectMarkerId);
					}
				}}
				onMouseUp={(e: Konva.KonvaEventObject<MouseEvent>) => {
					if (!isEmptyOrNil(selectMarkerId)) return;
					if (e.evt.which === 1 && isDrawing) {
						setIsDrawing(false);
						onMouseUp(e, mainColor, subColor, canvasMarkers, setCanvasMarkers, setSelectMarkerId);
					}
				}}
			>
				<Layer>
					<Image ref={imageRef} image={image} />
					{canvasMarkers.map((marker) => {
						return (
							<RenderMaker
								id={marker.id}
								key={marker.id}
								markerType={marker.type}
								attribute={marker.attribute}
								isSelected={selectMarkerId === marker.id}
								onMarkerSelect={setSelectMarkerId}
								onUpdateAttr={updateMarkerAttr}
							/>
						);
					})}
					{positionMarkers.map((pm) => {
						const size = 40;
						return (
							<Group key={pm.mappingNumber} x={pm.pointX - size / 2} y={pm.pointY - size / 2}>
								<Rect
									width={size}
									height={size}
									fill="rgba(255, 0, 0, 0.8)"
									stroke="rgba(255, 255, 255, 1)"
									strokeWidth={2}
									cornerRadius={2}
								/>
								<Text
									text={pm.mappingNumber.toString()}
									width={size}
									height={size}
									align="center"
									verticalAlign="middle"
									fontSize={size * 0.6}
									fill="white"
									fontStyle="bold"
									listening={false}
								/>
							</Group>
						);
					})}
				</Layer>
			</Stage>
		);
	},
);

Canvas.displayName = 'Canvas';

export default Canvas;
