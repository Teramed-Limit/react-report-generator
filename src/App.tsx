import React from 'react';
import './App.css';

import { Stack, Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import { RecoilRoot } from 'recoil';

import TabPanel from '../lib/UI/TabPanel/TabPanel.tsx';

import Report from './sample/Report.tsx';
import ReportGenerator from './sample/ReportGenerator.tsx';
import ReportImagePainter from './sample/ReportImagePainter.tsx';

function App() {
	const [tabIndex, setTabIndex] = React.useState(0);

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabIndex(newValue);
	};

	return (
		<RecoilRoot override={false}>
			<Stack sx={{ height: '100vh', p: 2 }}>
				<Stack
					direction="row"
					spacing={2}
					sx={{
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Tabs value={tabIndex} onChange={handleTabChange}>
							<Tab label="Report" value={0} />
							<Tab label="Rep. Generator" value={1} />
							<Tab label="Test" value={2} />
							<Tab label="Test" value={3} />
						</Tabs>
					</Box>
				</Stack>
				<TabPanel value={tabIndex} index={0}>
					<Report />
				</TabPanel>
				<TabPanel value={tabIndex} index={1}>
					<ReportGenerator />
				</TabPanel>
				<TabPanel value={tabIndex} index={2}>
					<ReportImagePainter />
				</TabPanel>
				<TabPanel value={tabIndex} index={3}>
					<div />
				</TabPanel>
			</Stack>
		</RecoilRoot>
	);
}

export default App;
