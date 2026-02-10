import React from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// Figma-style light theme colors
const lightTheme = {
	bgSecondary: '#ffffff',
	bgTertiary: '#f5f5f5',
	bgHover: '#fafafa',
	borderColor: '#e0e0e0',
	textPrimary: '#1a1a1a',
	textSecondary: '#5f6368',
	textMuted: '#9aa0a6',
};

const StyledAccordion = styled(Accordion)(() => ({
	'&.MuiAccordion-root': {
		margin: '0 !important',
		boxShadow: 'none',
		backgroundColor: 'transparent',
	},
	'&.MuiAccordion-root.Mui-expanded': {
		boxShadow: 'none',
		margin: '0 !important',
	},
	'&.MuiAccordion-root:before': {
		display: 'none',
	},
}));

const StyledAccordionSummary = styled(AccordionSummary)(() => ({
	minHeight: '32px',
	borderBottom: `solid 1px ${lightTheme.borderColor}`,
	padding: '0 8px 0 12px',
	margin: 0,
	backgroundColor: lightTheme.bgSecondary,

	'&.Mui-expanded .MuiAccordionSummary-content': {
		margin: 0,
	},
	'&.Mui-expanded': {
		minHeight: '32px',
		margin: 0,
	},
	'.MuiAccordionSummary-content': {
		padding: 0,
		margin: 0,
	},
	'.MuiPaper-root': {
		margin: 0,
	},
	'.MuiAccordionSummary-expandIconWrapper': {
		color: lightTheme.textMuted,
	},
	'&:hover': {
		backgroundColor: lightTheme.bgHover,
	},
}));

const StyledAccordionDetails = styled(AccordionDetails)(() => ({
	minHeight: '32px',
	padding: 0,
	margin: 0,
	backgroundColor: 'transparent',
	'&.MuiCollapse-root': {
		padding: 0,
	},
	'&.MuiAccordionDetails-root': {
		paddingLeft: '8px',
	},
}));

interface Props {
	title: string;
	defaultExpanded?: boolean;
	children?: React.ReactNode;
}

function ExpandToggler({ title, children, defaultExpanded = true }: Props) {
	return (
		<StyledAccordion sx={{ margin: '0' }} defaultExpanded={defaultExpanded}>
			<StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography
					sx={{
						fontSize: '11px',
						fontWeight: 500,
						color: lightTheme.textSecondary,
						textTransform: 'capitalize',
					}}
				>
					{title}
				</Typography>
			</StyledAccordionSummary>
			<StyledAccordionDetails>{children}</StyledAccordionDetails>
		</StyledAccordion>
	);
}

export default React.memo(ExpandToggler);
