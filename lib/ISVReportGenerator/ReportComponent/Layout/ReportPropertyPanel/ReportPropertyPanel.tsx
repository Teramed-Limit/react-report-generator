import React from 'react';

import { lighten, Stack, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import * as R from 'ramda';
import { AiOutlineMinus } from 'react-icons/ai';
import { BsCardImage } from 'react-icons/bs';
import { FaMousePointer } from 'react-icons/fa';
import { IoTextOutline } from 'react-icons/io5';
import { TbNumbers } from 'react-icons/tb';
import { useRecoilState, useSetRecoilState } from 'recoil';

import {
	activeCompAttributeAtom,
	createRepCompTypeAtom,
	footerDefineAtom,
	headerDefineAtom,
} from '../../../../recoil/atoms/header-footer-defineAtom.ts';
import { ReportComponentType } from '../../../../types/report-generator/component/rep-component.ts';
import StyledTreeItem from '../../../../UI/StyledTreeItem/StyledTreeItem.tsx';
import TabPanel from '../../../../UI/TabPanel/TabPanel.tsx';
import ReportComponentAttributeList from '../../Attribute/ReportComponentAttributeList/ReportComponentAttributeList.tsx';
import ReportPageAttribute from '../../Attribute/ReportPageAttribute/ReportPageAttribute.tsx';

import classes from './ReportPropertyPanel.module.scss';

const StyleTabs = styled(Tabs)({
	borderBottom: '1px solid #e8e8e8',
	'& .MuiTabs-indicator': {
		backgroundColor: 'mediumslateblue',
	},
});

const StyleTab = styled((props: { label: string }) => <Tab disableRipple {...props} />)(({ theme }) => ({
	textTransform: 'none',
	minWidth: 0,
	marginRight: theme.spacing(1),

	color: lighten('#7B68EE', 0.5),
	fontSize: '0.875em',
	fontWeight: 'bold',
	fontFamily: ['Roboto', 'Helvetica', 'Arial', 'Roboto', 'sans-serif'].join(','),
	'&:hover': {
		color: lighten('#7B68EE', 0.2),
	},
	'&.Mui-selected': {
		color: 'mediumslateblue',
	},
	'&.Mui-focusVisible': {
		color: 'mediumslateblue',
	},
}));

function ReportPropertyPanel() {
	const [headerDefine, setHeaderDefine] = useRecoilState(headerDefineAtom);
	const [footerDefine, setFooterDefine] = useRecoilState(footerDefineAtom);
	const [activeCompAttribute, setActiveCompAttribute] = useRecoilState(activeCompAttributeAtom);
	const setCreateRepCompType = useSetRecoilState(createRepCompTypeAtom);
	const [value, setValue] = React.useState(0);
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const handleItemSelectionToggle = (event: React.SyntheticEvent, itemId: string, isSelected: boolean) => {
		if (isSelected) {
			if (!Object.values(ReportComponentType).includes(itemId as ReportComponentType)) return;
			setCreateRepCompType(itemId as ReportComponentType);
		}
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
		<Stack direction="column" className={classes.container} sx={{ minWidth: '300px' }}>
			<Stack sx={{ width: '100%', height: '100%', p: 1, overflow: 'hidden' }} direction="column">
				<StyleTabs value={value} onChange={handleChange}>
					<StyleTab label="Component" />
					<StyleTab label="Attribute" />
					<StyleTab label="Page" />
				</StyleTabs>
				{/* Component */}
				<TabPanel value={value} index={0}>
					<SimpleTreeView
						sx={{ height: '100%', width: '200px', padding: '8px 8px 8px 0' }}
						onItemSelectionToggle={handleItemSelectionToggle}
					>
						<StyledTreeItem
							itemId={ReportComponentType.General}
							labelText="General"
							labelIcon={FaMousePointer}
						/>
						<StyledTreeItem
							itemId={ReportComponentType.Label}
							labelText="Label"
							labelIcon={IoTextOutline}
						/>
						<StyledTreeItem
							itemId={ReportComponentType.DynamicLabel}
							labelText="Dynamic Label"
							labelIcon={IoTextOutline}
						/>
						<StyledTreeItem itemId={ReportComponentType.Image} labelText="Image" labelIcon={BsCardImage} />
						<StyledTreeItem
							itemId={ReportComponentType.DynamicImage}
							labelText="Dynamic Image"
							labelIcon={BsCardImage}
						/>
						<StyledTreeItem itemId={ReportComponentType.Line} labelText="Line" labelIcon={AiOutlineMinus} />
						<StyledTreeItem
							itemId={ReportComponentType.PageNumber}
							labelText="Page Number"
							labelIcon={TbNumbers}
						/>
					</SimpleTreeView>
				</TabPanel>
				{/* Attribute */}
				<TabPanel value={value} index={1}>
					<ReportComponentAttributeList
						compAttribute={activeCompAttribute}
						onSetCompAttribute={onSetActiveCompAttribute}
					/>
				</TabPanel>
				{/* Page */}
				<TabPanel value={value} index={2}>
					<ReportPageAttribute pageAttribute={headerDefine} onSetPageAttribute={onSetHeaderAttribute} />
					<ReportPageAttribute pageAttribute={footerDefine} onSetPageAttribute={onSetFooterAttribute} />
				</TabPanel>
			</Stack>
		</Stack>
	);
}

export default React.memo(ReportPropertyPanel);
