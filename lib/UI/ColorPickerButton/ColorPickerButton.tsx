import React, { useState } from 'react';

import { ArrowDropDown, FormatColorFill } from '@mui/icons-material';
import { Button, Popover } from '@mui/material';
import { ColorResult, SketchPicker } from 'react-color';

import classes from './ColorPickerButton.module.scss';

interface Props {
	label?: string;
	value: string;
	onValueChange: (color: string) => void;
}

function ColorPickerButton({ label = '', value, onValueChange }: Props) {
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
	const [colorPickerOpen, setColorPickerOpen] = useState(false);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setColorPickerOpen(true);
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setColorPickerOpen(false);
		setAnchorEl(null);
	};

	const changeColor = (selectColor: ColorResult) => {
		onValueChange(selectColor.hex);
	};

	return (
		<>
			<Button sx={{ padding: '0' }} onClick={handleClick} className={classes.button}>
				<span>{label}</span>
				<FormatColorFill style={{ color: value, fontSize: '24px' }} />
				<ArrowDropDown style={{ fontSize: '24px' }} />
			</Button>
			<Popover
				open={colorPickerOpen}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<SketchPicker
					color={value}
					onChangeComplete={changeColor}
					disableAlpha
					presetColors={[
						'TRANSPARENT',
						'#D0021B',
						'#F5A623',
						'#F8E71C',
						'#8B572A',
						'#7ED321',
						'#417505',
						'#BD10E0',
						'#9013FE',
						'#4A90E2',
						'#50E3C2',
						'#B8E986',
						'#000000',
						'#4A4A4A',
						'#9B9B9B',
						'#FFFFFF',
					]}
				/>
			</Popover>
		</>
	);
}

export default ColorPickerButton;
