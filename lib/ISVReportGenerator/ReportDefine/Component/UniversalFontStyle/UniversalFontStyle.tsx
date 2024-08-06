import React, { useState } from 'react';

import { Button, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

import BaseNumber from '../../../../UI/BaseNumber/BaseNumber.tsx';
import ColorPickerButton from '../../../../UI/ColorPickerButton/ColorPickerButton.tsx';
import FontNameSelection from '../../Attribute/Common/FontNameSelection/FontNameSelection';
import FontWeightSelection from '../../Attribute/Common/FontWeightSelection/FontWeightSelection';
import classes from './UniversalFontStyle.module.scss';

interface Props {
	title: string;
	setStyle: (styleName: string, styleValue: any) => void;
}

function UniversalFontStyle({ title, setStyle }: Props) {
	const [fontStyle, setFontStyle] = useState({
		fontFamily: 'Noto Sans TC',
		fontSize: '10',
		fontWeight: 'bold',
		color: 'black',
	});

	const handleStyleChanged = (styleName: string, styleValue: any) => {
		setFontStyle((prev) => {
			return { ...prev, [styleName]: styleValue };
		});
		setStyle(styleName, styleValue);
	};

	return (
		<Stack direction="column" spacing="6px">
			<Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
				{title}
				<Button
					sx={{ marginLeft: '10px' }}
					size="small"
					variant="contained"
					color="primary"
					onClick={() => {
						handleStyleChanged('fontFamily', fontStyle.fontFamily);
						handleStyleChanged('fontSize', fontStyle.fontSize);
						handleStyleChanged('fontWeight', fontStyle.fontWeight);
						handleStyleChanged('color', fontStyle.color);
					}}
				>
					Apply
				</Button>
			</Typography>
			<Stack direction="row" spacing="4px">
				<div style={{ width: '150px' }} className={classes.input}>
					<FontNameSelection
						value={fontStyle.fontFamily}
						onValueChange={(val) => handleStyleChanged('fontFamily', val)}
					/>
				</div>

				<div style={{ width: '50px' }} className={classes.input}>
					<BaseNumber
						value={fontStyle.fontSize}
						onValueChange={(val) => handleStyleChanged('fontSize', val)}
					/>
				</div>

				<div style={{ width: '100px' }} className={classes.input}>
					<FontWeightSelection
						value={fontStyle.fontWeight}
						onValueChange={(val) => handleStyleChanged('fontWeight', val)}
					/>
				</div>

				<div style={{ width: '70px' }} className={classes.input}>
					<ColorPickerButton
						key="color"
						value={fontStyle.color}
						onValueChange={(val) => handleStyleChanged('color', val)}
					/>
				</div>
			</Stack>
		</Stack>
	);
}

export default React.memo(UniversalFontStyle);
