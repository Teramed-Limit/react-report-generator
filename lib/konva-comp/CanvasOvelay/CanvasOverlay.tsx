import React from 'react';

import { IconButton } from '@mui/material';
import cx from 'classnames';
import Konva from 'konva';
import { BiSelection } from 'react-icons/bi';
import { BsFillTrashFill } from 'react-icons/bs';
import { FiCopy } from 'react-icons/fi';

import { CanvasMarker } from '../../types/canvas/canvas-maker-attribute.ts';
import { NodeEnableMapper } from '../Canvas/Tools/marker-mapper';
import classes from './CanvasOverlay.module.scss';

interface Props {
	canvasMarkers: CanvasMarker<Konva.ShapeConfig>[];
	selectMarkerId: string;
	setCanvasMarkers: React.Dispatch<React.SetStateAction<CanvasMarker<Konva.ShapeConfig>[]>>;
	setSelectMarkerId: React.Dispatch<React.SetStateAction<string>>;
	deleteMarker: (markerId: string) => void;
	copyMarker: (markerId: string) => void;
}

function CanvasOverlay({
	canvasMarkers,
	selectMarkerId,
	setCanvasMarkers,
	setSelectMarkerId,
	deleteMarker,
	copyMarker,
}: Props) {
	return (
		<div className={classes.canvasMarkerList}>
			<div className={classes.title}>Overlay</div>

			<div style={{ height: canvasMarkers.length === 0 ? '0px' : 'auto' }} className={classes.itemContainer}>
				{canvasMarkers.map((marker, index) => {
					return (
						<>
							<div
								className={cx(classes.item, {
									[classes.selected]: selectMarkerId === marker.id,
								})}
							>
								{`${marker.name.replace(/_(.*)/g, '')}_${index + 1}`}
								<div className={classes.buttonContainer}>
									{NodeEnableMapper[marker.type] ? (
										<>
											<IconButton
												size="small"
												color="primary"
												onClick={() => {
													setSelectMarkerId(marker.id);
												}}
											>
												<BiSelection />
											</IconButton>
											<IconButton
												size="small"
												color="default"
												onClick={() => {
													copyMarker(marker.id);
												}}
											>
												<FiCopy />
											</IconButton>
										</>
									) : null}

									<IconButton
										size="small"
										color="secondary"
										onClick={() => {
											deleteMarker(marker.id);
										}}
									>
										<BsFillTrashFill />
									</IconButton>
								</div>
							</div>
						</>
					);
				})}
			</div>
		</div>
	);
}

export default CanvasOverlay;
