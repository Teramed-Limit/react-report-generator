import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingOverlayProps {
	isLoading: boolean;
	message?: string;
	progress?: number;
}

export function LoadingOverlay({ isLoading, message = 'Loading...', progress }: LoadingOverlayProps) {
	if (!isLoading) return null;

	return (
		<Box
			sx={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'rgba(255, 255, 255, 0.8)',
				zIndex: 9999,
			}}
		>
			<CircularProgress
				variant={progress !== undefined ? 'determinate' : 'indeterminate'}
				value={progress}
				size={60}
			/>
			<Typography variant="body1" sx={{ mt: 2 }}>
				{message}
			</Typography>
			{progress !== undefined && (
				<Typography variant="body2" sx={{ mt: 1 }}>
					{Math.round(progress)}%
				</Typography>
			)}
		</Box>
	);
}
