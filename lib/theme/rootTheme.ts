import { createTheme } from '@mui/material/styles';

export const rootTheme = createTheme({
	breakpoints: {
		keys: ['xs', 'sm', 'md', 'lg', 'xl'],
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
		unit: 'px',
	},
	direction: 'ltr',
	components: {
		MuiInput: {
			defaultProps: {
				size: 'small',
			},
		},
		MuiButtonBase: {
			defaultProps: {
				disableTouchRipple: true,
			},
		},
		MuiButton: {
			defaultProps: {
				disableElevation: true,
				size: 'small',
			},
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
				sizeMedium: {
					padding: '8px',
					fontSize: '0.8125rem',
					color: '#fff',
					fontWeight: 700,
				},
			},
		},
		MuiContainer: {
			styleOverrides: {
				root: {
					'@media (min-width:900px)': {
						paddingLeft: '16px',
						paddingRight: '16px',
					},
				},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					borderColor: '#132F4C',
				},
			},
		},
		MuiLink: {
			defaultProps: {
				underline: 'none',
			},
			styleOverrides: {
				root: {
					fontWeight: 700,
					display: 'inline-flex',
					alignItems: 'center',
					'&.MuiTypography-body1 > svg': {
						marginTop: 2,
					},
					'& svg:last-child': {
						marginLeft: 2,
					},
				},
			},
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					borderRadius: 5,
					'&:hover, &:focus': {
						backgroundColor: '',
					},
				},
			},
		},
		MuiSelect: {
			defaultProps: {},
			styleOverrides: {
				iconFilled: {
					top: 'calc(50% - .25em)',
				},
			},
		},
		MuiTab: {
			defaultProps: {
				disableTouchRipple: true,
			},
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				outlined: {
					display: 'block',
					borderColor: '#265D97',
					backgroundColor: '#132F4C',
					'a&, button&': {
						'&:hover': {
							boxShadow: '1px 1px 20px 0 rgb(90 105 120 / 20%)',
						},
					},
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					padding: '8px 16px',
					borderColor: '#132F4C',
				},
				head: {
					color: '#fff',
					fontWeight: 700,
				},
				body: {
					color: '#B2BAC2',
				},
			},
		},
		MuiToggleButtonGroup: {
			defaultProps: {
				size: 'small',
			},
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
			},
		},
		MuiToggleButton: {
			defaultProps: {
				size: 'small',
			},
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					paddingTop: 7,
					paddingBottom: 7,
				},
			},
		},
		MuiDialog: {
			styleOverrides: {
				root: {
					transition: 'none',
				},
			},
		},
		MuiCheckbox: {
			defaultProps: {
				size: 'small',
			},
		},
	},
	unstable_strictMode: true,
	mixins: {
		toolbar: {
			minHeight: 56,
			'@media (min-width:0px) and (orientation: landscape)': {
				minHeight: 48,
			},
			'@media (min-width:600px)': {
				minHeight: 64,
			},
		},
	},
	shadows: [
		'none',
		'0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
		'0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
		'0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
		'0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
		'0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
		'0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
		'0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
		'0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
		'0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
		'0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
		'0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
		'0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
		'0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
		'0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
		'0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
		'0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
		'0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
		'0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
		'0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
		'0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
		'0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
		'0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
		'0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
		'0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
	],
	transitions: {
		duration: {
			shortest: 0,
			shorter: 0,
			short: 0,
			// most basic recommended timing
			standard: 0,
			// this is to be used in complex animations
			complex: 0,
			// recommended when something is entering screen
			enteringScreen: 0,
			// recommended when something is leaving screen
			leavingScreen: 0,
		},
		easing: {
			easeInOut: 'cubic-bezier(0.2, 0, 0.1, 1)',
			easeOut: 'cubic-bezier(0.0, 0, 0.1, 1)',
			easeIn: 'cubic-bezier(0.2, 0, 1, 1)',
			sharp: 'cubic-bezier(0.2, 0, 0.3, 1)',
		},
	},
	zIndex: {
		mobileStepper: 1000,
		speedDial: 1050,
		appBar: 1100,
		drawer: 1200,
		modal: 1300,
		snackbar: 1400,
		tooltip: 1500,
	},
});
