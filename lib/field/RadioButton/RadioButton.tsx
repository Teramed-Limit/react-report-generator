import React from 'react';

import FormControlLabel from '@mui/material/FormControlLabel';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useRecoilValue } from 'recoil';

import { codeListAtom } from '../../recoil/atoms/codeListAtom.ts';
import { RadioField } from '../../types/field/radio-field.ts';

interface Props {
	id: string;
	field: RadioField;
	value: string;
	onValueChange: (value: string) => void;
	disabled: boolean;
}

function RadioButton({ id, field, value, onValueChange, disabled }: Props) {
	const { filterCondition, optionSource, direction } = field;
	const options = useRecoilValue(codeListAtom({ optionSource, filterCondition }));

	const labelKey = field.optionSource.labelKey || 'label';
	const valueKey = field.optionSource.key || 'value';

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.stopPropagation();
		event.preventDefault();
		onValueChange((event.target as HTMLInputElement).value);
	};

	return (
		<RadioGroup row value={value} onChange={handleChange}>
			{options.map((option) => {
				return (
					<FormControlLabel
						sx={{
							m: 0,
						}}
						disabled={disabled}
						key={option.id}
						value={option[valueKey]}
						control={<BpRadio />}
						label={
							<Typography
								style={{
									fontFamily: 'inherit',
									fontSize: 'inherit',
									fontWeight: 'inherit',
									fontStyle: 'inherit',
									fontVariant: 'inherit',
									lineHeight: 'inherit',
									textTransform: 'inherit',
									letterSpacing: 'inherit',
									wordSpacing: 'inherit',
									textIndent: 'inherit',
									textAlign: 'inherit',
									verticalAlign: 'inherit',
									direction: 'inherit',
									textShadow: 'inherit',
									color: 'inherit',
								}}
							>
								{option[labelKey]}
							</Typography>
						}
					/>
				);
			})}
		</RadioGroup>
	);
}

export default RadioButton;

const BpIcon = styled('span')(({ theme }) => ({
	borderRadius: '50%',
	width: 16,
	height: 16,
	boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
	backgroundColor: '#f5f8fa',
	backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
	'.Mui-focusVisible &': {
		outline: '2px auto rgba(19,124,189,.6)',
		outlineOffset: 2,
	},
	'input:hover ~ &': {
		backgroundColor: '#ebf1f5',
		...theme.applyStyles('dark', {
			backgroundColor: '#30404d',
		}),
	},
	'input:disabled ~ &': {
		boxShadow: 'none',
		background: 'rgba(206,217,224,.5)',
		...theme.applyStyles('dark', {
			background: 'rgba(57,75,89,.5)',
		}),
	},
	...theme.applyStyles('dark', {
		boxShadow: '0 0 0 1px rgb(16 22 26 / 40%)',
		backgroundColor: '#394b59',
		backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))',
	}),
}));

const BpCheckedIcon = styled(BpIcon)({
	backgroundColor: '#137cbd',
	backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
	'&::before': {
		display: 'block',
		width: 16,
		height: 16,
		backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
		content: '""',
	},
	'input:hover ~ &': {
		backgroundColor: '#106ba3',
	},
});

function BpRadio(props: RadioProps) {
	return <Radio sx={{ p: '2px 8px' }} disableRipple checkedIcon={<BpCheckedIcon />} icon={<BpIcon />} {...props} />;
}
