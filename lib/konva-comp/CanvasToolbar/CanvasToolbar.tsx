import React from 'react';

import { PanoramaFishEye as Circle, FormatColorText, CheckBoxOutlineBlank as Square } from '@mui/icons-material';
import { BsArrowsMove } from 'react-icons/bs';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { MdGesture } from 'react-icons/md';

import { MarkerType } from '../../types/canvas/canvas-maker-attribute.ts';
import ColorPickerButton from '../../UI/ColorPickerButton/ColorPickerButton.tsx';

import classes from './CanvasToolbar.module.scss';

interface Props {
	markerType: MarkerType;
	setCanvasTool: (event: React.MouseEvent<HTMLElement>, tool: string) => void;
	mainColor: string;
	subColor: string;
	setMainColor: (color: string) => void;
	setSubColor: (color: string) => void;
}

interface ToolButtonProps {
	value: string;
	icon: React.ReactNode;
	label: string;
	shortcut?: string;
	isSelected: boolean;
	onClick: (event: React.MouseEvent<HTMLElement>, value: string) => void;
}

function ToolButton({ value, icon, label, shortcut, isSelected, onClick }: ToolButtonProps) {
	return (
		<button
			type="button"
			className={`${classes.toolButton} ${isSelected ? classes.selected : ''}`}
			onClick={(e) => onClick(e, value)}
			title={shortcut ? `${label} (${shortcut})` : label}
		>
			<span className={classes.toolIcon}>{icon}</span>
			<span className={classes.toolLabel}>{label}</span>
		</button>
	);
}

function CanvasToolbar({ markerType, setCanvasTool, mainColor, setMainColor, subColor, setSubColor }: Props) {
	const tools = [
		{ value: 'None', icon: <BsArrowsMove />, label: 'Move', shortcut: 'V' },
		{ value: 'Text', icon: <FormatColorText />, label: 'Text', shortcut: 'T' },
		{ value: 'Square', icon: <Square />, label: 'Rectangle', shortcut: 'R' },
		{ value: 'Circle', icon: <Circle />, label: 'Ellipse', shortcut: 'O' },
		{ value: 'Arrow', icon: <HiOutlineArrowRight className={classes.rotate45} />, label: 'Arrow', shortcut: 'A' },
		{ value: 'FreeDraw', icon: <MdGesture />, label: 'Pencil', shortcut: 'P' },
	];

	return (
		<div className={classes.toolbar}>
			{/* Tools Section */}
			<div className={classes.toolsSection}>
				{tools.map((tool) => (
					<ToolButton
						key={tool.value}
						value={tool.value}
						icon={tool.icon}
						label={tool.label}
						shortcut={tool.shortcut}
						isSelected={markerType.toString() === tool.value}
						onClick={setCanvasTool}
					/>
				))}
			</div>

			{/* Divider */}
			<div className={classes.divider} />

			{/* Color Section */}
			<div className={classes.colorSection}>
				<div className={classes.colorRow}>
					<span className={classes.colorLabel}>Fill</span>
					<ColorPickerButton label="" value={mainColor} onValueChange={setMainColor} />
				</div>
				<div className={classes.colorRow}>
					<span className={classes.colorLabel}>Stroke</span>
					<ColorPickerButton label="" value={subColor} onValueChange={setSubColor} />
				</div>
			</div>
		</div>
	);
}

export default CanvasToolbar;
