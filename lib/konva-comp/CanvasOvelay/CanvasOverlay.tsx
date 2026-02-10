import React from 'react';

import { IconButton, Tooltip } from '@mui/material';
import cx from 'classnames';
import Konva from 'konva';
import { BiSelection } from 'react-icons/bi';
import { BsFillTrashFill } from 'react-icons/bs';
import { FiCopy } from 'react-icons/fi';
import { MdArrowForward, MdGesture, MdOutlineCircle, MdOutlineRectangle, MdTextFields } from 'react-icons/md';

import { CanvasMarker, MarkerType } from '../../types/canvas/canvas-maker-attribute.ts';
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

const MarkerIconMapper: Record<MarkerType, React.ReactNode> = {
	[MarkerType.None]: null,
	[MarkerType.Text]: <MdTextFields />,
	[MarkerType.Circle]: <MdOutlineCircle />,
	[MarkerType.Square]: <MdOutlineRectangle />,
	[MarkerType.Arrow]: <MdArrowForward className={classes.rotateIcon} />,
	[MarkerType.FreeDraw]: <MdGesture />,
};

function CanvasOverlay({
	canvasMarkers,
	selectMarkerId,
	setCanvasMarkers,
	setSelectMarkerId,
	deleteMarker,
	copyMarker,
}: Props) {
	return (
		<div className={classes.layerPanel}>
			<div className={classes.panelHeader}>
				<span className={classes.panelTitle}>Layers</span>
				<span className={classes.layerCount}>{canvasMarkers.length}</span>
			</div>

			<div className={classes.layerList}>
				{canvasMarkers.length === 0 ? (
					<div className={classes.emptyState}>No layers yet</div>
				) : (
					canvasMarkers.map((marker, index) => (
						<div
							key={marker.id}
							className={cx(classes.layerItem, {
								[classes.selected]: selectMarkerId === marker.id,
							})}
							onClick={() => setSelectMarkerId(marker.id)}
						>
							<div className={classes.layerInfo}>
								<span className={classes.layerIcon}>{MarkerIconMapper[marker.type]}</span>
								<span className={classes.layerName}>
									{`${marker.name.replace(/_(.*)/g, '')} ${index + 1}`}
								</span>
							</div>
							<div className={classes.layerActions}>
								{NodeEnableMapper[marker.type] && (
									<>
										<Tooltip title="Select" placement="top" arrow>
											<IconButton
												size="small"
												className={classes.actionButton}
												onClick={(e) => {
													e.stopPropagation();
													setSelectMarkerId(marker.id);
												}}
											>
												<BiSelection />
											</IconButton>
										</Tooltip>
										<Tooltip title="Duplicate" placement="top" arrow>
											<IconButton
												size="small"
												className={classes.actionButton}
												onClick={(e) => {
													e.stopPropagation();
													copyMarker(marker.id);
												}}
											>
												<FiCopy />
											</IconButton>
										</Tooltip>
									</>
								)}
								<Tooltip title="Delete" placement="top" arrow>
									<IconButton
										size="small"
										className={`${classes.actionButton} ${classes.deleteButton}`}
										onClick={(e) => {
											e.stopPropagation();
											deleteMarker(marker.id);
										}}
									>
										<BsFillTrashFill />
									</IconButton>
								</Tooltip>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default CanvasOverlay;
