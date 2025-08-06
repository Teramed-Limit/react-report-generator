import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, Box, Button, Typography } from '@mui/material';

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
	hasError: boolean;
	error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): State {
		return {
			hasError: true,
			error,
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('ISVReport Error:', error, errorInfo);
		this.props.onError?.(error, errorInfo);
	}

	handleReset = () => {
		this.setState({ hasError: false, error: undefined });
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<Box sx={{ p: 3 }}>
					<Alert severity="error" sx={{ mb: 2 }}>
						<Typography variant="h6" component="div">
							報告渲染錯誤
						</Typography>
						<Typography variant="body2" sx={{ mt: 1 }}>
							{this.state.error?.message || '發生未知錯誤'}
						</Typography>
					</Alert>
					<Button variant="contained" onClick={this.handleReset}>
						重試
					</Button>
				</Box>
			);
		}

		return this.props.children;
	}
}
