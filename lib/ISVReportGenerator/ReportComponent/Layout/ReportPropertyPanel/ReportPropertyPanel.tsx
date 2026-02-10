import React from 'react';

import { Box, Paper, Stack, Tab, Tabs, Typography } from '@mui/material';
import * as R from 'ramda';
import { AiOutlineMinus } from 'react-icons/ai';
import { BsCardImage } from 'react-icons/bs';
import { FaMousePointer } from 'react-icons/fa';
import { IoTextOutline } from 'react-icons/io5';
import { MdOutlineDescription, MdOutlineTune, MdOutlineWidgets } from 'react-icons/md';
import { TbNumbers } from 'react-icons/tb';
import { useRecoilState, useSetRecoilState } from 'recoil';

import {
	activeCompAttributeAtom,
	createRepCompTypeAtom,
	footerDefineAtom,
	headerDefineAtom,
} from '../../../../recoil/atoms/header-footer-defineAtom.ts';
import { ReportComponentType } from '../../../../types/report-generator/component/rep-component.ts';
import TabPanel from '../../../../UI/TabPanel/TabPanel.tsx';
import ReportComponentAttributeList from '../../Attribute/ReportComponentAttributeList/ReportComponentAttributeList.tsx';
import ReportPageAttribute from '../../Attribute/ReportPageAttribute/ReportPageAttribute.tsx';

import classes from './ReportPropertyPanel.module.scss';

// Component type definitions grouped by category
const componentGroups = [
	{
		category: 'Basic',
		items: [
			{ type: ReportComponentType.General, label: 'General', icon: FaMousePointer },
			{ type: ReportComponentType.Line, label: 'Line', icon: AiOutlineMinus },
		],
	},
	{
		category: 'Text',
		items: [
			{ type: ReportComponentType.Label, label: 'Label', icon: IoTextOutline },
			{ type: ReportComponentType.DynamicLabel, label: 'Dynamic Label', icon: IoTextOutline },
			{ type: ReportComponentType.PageNumber, label: 'Page Number', icon: TbNumbers },
		],
	},
	{
		category: 'Media',
		items: [
			{ type: ReportComponentType.Image, label: 'Image', icon: BsCardImage },
			{ type: ReportComponentType.DynamicImage, label: 'Dynamic Image', icon: BsCardImage },
		],
	},
];

interface ComponentCardProps {
	label: string;
	icon: React.ElementType;
	selected: boolean;
	onClick: () => void;
}

const ComponentCard = React.memo(function ComponentCard({ label, icon: Icon, selected, onClick }: ComponentCardProps) {
	return (
		<Paper
			elevation={0}
			onClick={onClick}
			role="button"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					onClick();
				}
			}}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 0.75,
				p: 1.5,
				minHeight: 64,
				cursor: 'pointer',
				border: 1,
				borderColor: selected ? 'primary.main' : 'transparent',
				borderRadius: 2,
				bgcolor: selected ? 'primary.50' : 'grey.100',
				transition: 'all 0.15s ease-in-out',
				'&:hover': {
					bgcolor: selected ? 'primary.100' : 'grey.200',
					borderColor: selected ? 'primary.main' : 'grey.300',
				},
			}}
		>
			<Box
				component={Icon}
				sx={{
					fontSize: 20,
					color: selected ? 'primary.main' : 'text.secondary',
				}}
			/>
			<Typography
				variant="caption"
				sx={{
					fontWeight: selected ? 600 : 500,
					color: selected ? 'primary.main' : 'text.primary',
					textAlign: 'center',
					lineHeight: 1.2,
				}}
			>
				{label}
			</Typography>
		</Paper>
	);
});

function ReportPropertyPanel() {
	const [headerDefine, setHeaderDefine] = useRecoilState(headerDefineAtom);
	const [footerDefine, setFooterDefine] = useRecoilState(footerDefineAtom);
	const [activeCompAttribute, setActiveCompAttribute] = useRecoilState(activeCompAttributeAtom);
	const setCreateRepCompType = useSetRecoilState(createRepCompTypeAtom);
	const [value, setValue] = React.useState(0);
	const [selectedComponentType, setSelectedComponentType] = React.useState<ReportComponentType | null>(null);

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const handleComponentSelect = (type: ReportComponentType) => {
		setSelectedComponentType(type);
		setCreateRepCompType(type);
	};

	const onSetHeaderAttribute = (attrPath: (number | string)[], attrValue: any) => {
		setHeaderDefine((prev) => {
			return R.assocPath(attrPath, attrValue, prev);
		});
	};

	const onSetFooterAttribute = (attrPath: (number | string)[], attrValue: any) => {
		setFooterDefine((prev) => {
			return R.assocPath(attrPath, attrValue, prev);
		});
	};

	const onSetActiveCompAttribute = (
		uuid: string,
		attrPath: (number | string)[],
		attrValue: number | string | boolean,
	) => {
		if (!activeCompAttribute) return;
		const newValue = R.assocPath([...attrPath], attrValue, activeCompAttribute);
		setActiveCompAttribute(newValue);
	};

	return (
		<Paper
			elevation={1}
			className={classes.container}
			sx={{
				minWidth: 300,
				bgcolor: 'background.paper',
				borderRadius: 3,
				border: 1,
				borderColor: 'divider',
			}}
		>
			<Stack sx={{ width: '100%', height: '100%', overflow: 'hidden' }} direction="column">
				<Tabs
					value={value}
					onChange={handleChange}
					variant="fullWidth"
					sx={{
						borderBottom: 1,
						borderColor: 'divider',
						bgcolor: 'grey.50',
						'& .MuiTab-root': {
							minHeight: 48,
							py: 1.5,
						},
					}}
				>
					<Tab
						icon={<MdOutlineWidgets size={18} />}
						iconPosition="start"
						label="Component"
						sx={{ gap: 0.75 }}
					/>
					<Tab icon={<MdOutlineTune size={18} />} iconPosition="start" label="Attribute" sx={{ gap: 0.75 }} />
					<Tab
						icon={<MdOutlineDescription size={18} />}
						iconPosition="start"
						label="Page"
						sx={{ gap: 0.75 }}
					/>
				</Tabs>

				{/* Component Tab - Grouped Cards */}
				<TabPanel value={value} index={0}>
					{componentGroups.map((group) => (
						<Box key={group.category} className={classes.componentGroup}>
							<Typography
								variant="overline"
								sx={{
									fontWeight: 600,
									color: 'text.secondary',
									letterSpacing: 0.5,
									px: 0.5,
								}}
							>
								{group.category}
							</Typography>
							<Box className={classes.componentGrid}>
								{group.items.map((comp) => (
									<ComponentCard
										key={comp.type}
										label={comp.label}
										icon={comp.icon}
										selected={selectedComponentType === comp.type}
										onClick={() => handleComponentSelect(comp.type)}
									/>
								))}
							</Box>
						</Box>
					))}
				</TabPanel>

				{/* Attribute Tab */}
				<TabPanel value={value} index={1}>
					<ReportComponentAttributeList
						compAttribute={activeCompAttribute}
						onSetCompAttribute={onSetActiveCompAttribute}
					/>
				</TabPanel>

				{/* Page Tab */}
				<TabPanel value={value} index={2}>
					<ReportPageAttribute pageAttribute={headerDefine} onSetPageAttribute={onSetHeaderAttribute} />
					<ReportPageAttribute pageAttribute={footerDefine} onSetPageAttribute={onSetFooterAttribute} />
				</TabPanel>
			</Stack>
		</Paper>
	);
}

export default React.memo(ReportPropertyPanel);
