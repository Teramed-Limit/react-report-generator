import React from 'react';

import { CheckBoxOutlineBlank as Square, FormatColorText, PanoramaFishEye as Circle } from '@mui/icons-material';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
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

function CanvasToolbar({ markerType, setCanvasTool, mainColor, setMainColor, subColor, setSubColor }: Props) {
	return (
		<div className={classes.toolbar}>
			{/* Layer 1 */}
			<ToggleButtonGroup exclusive value={markerType.toString()} onChange={(e, v) => setCanvasTool(e, v)}>
				<ToggleButton value="None">
					<BsArrowsMove className={classes.icon24} />
				</ToggleButton>
				<ToggleButton value="Text">
					<FormatColorText />
				</ToggleButton>
				<ToggleButton value="Square">
					<Square />
				</ToggleButton>
				<ToggleButton value="Circle">
					<Circle />
				</ToggleButton>
				<ToggleButton value="Arrow">
					<HiOutlineArrowRight className={[classes.icon24, classes.rotate45].join(' ')} />
				</ToggleButton>
				<ToggleButton value="FreeDraw">
					<MdGesture className={classes.icon24} />
				</ToggleButton>
			</ToggleButtonGroup>
			{/* Layer 2 */}
			<div className={classes.buttonBar}>
				<ColorPickerButton label="Main" value={mainColor} onValueChange={setMainColor} />
				<ColorPickerButton label="Sub" value={subColor} onValueChange={setSubColor} />
			</div>
		</div>
	);
}

export default CanvasToolbar;
