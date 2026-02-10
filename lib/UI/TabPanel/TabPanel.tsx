import React from 'react';

import { Fade, Stack } from '@mui/material';

interface Props {
	children?: React.ReactNode;
	index: number;
	value: number;
	direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
}

function TabPanel({ children, value, direction = 'column', index }: Props) {
	const isActive = value === index;

	return (
		<Fade in={isActive} timeout={150} unmountOnExit>
			<Stack
				spacing={1}
				p={1.5}
				direction={direction}
				sx={{
					flex: '1 1 auto',
					overflow: 'auto',
					width: '100%',
					height: '100%',
				}}
			>
				{children}
			</Stack>
		</Fade>
	);
}

export default TabPanel;
