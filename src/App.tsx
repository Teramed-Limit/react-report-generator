import './App.css';
import { useRef, useState } from 'react';

import { Button } from '@mui/material';
import { RecoilRoot } from 'recoil';

import { ISVReport, ISVReportHandle } from '../lib/components/ISVReport';
import { FormDefine } from '../lib/types/define.ts';
import { gridDefine } from './constant/report-define.ts';

const initialFormData = {
	// ReportTemplate: 'value1',
	// ReportTemplate2: ['value12', 'value2'],
	StudyInstanceUID: '1.3.6.1.4.1.54514.20240314115126.1.9494.278',
	StudyDate: '20240411',
	PatientId: 'test',
	PatientsName: 'test',
	PatientsSex: 'M',
	PatientsBirthDate: '20240303',
	PatientAge: '0',
	Version: '1',
	ReportStatus: 'Saved',
	Author: 'user',
	ReportAttachmentData: [
		{
			Id: 253,
			AttachmentType: 'ReferringLetter',
			FilePath:
				'http://192.168.50.214:8080//attachment\\1.3.6.1.4.1.54514.20240314115126.1.9494.278_ReferringLetter_1.pdf',
		},
		{
			Id: 254,
			AttachmentType: 'OldReport',
			FilePath:
				'http://192.168.50.214:8080//attachment\\1.3.6.1.4.1.54514.20240314115126.1.9494.278_OldReport_1.jpg',
		},
	],
	AccessionNumber: 'S220240314001',
	StudyDescription: 'ddddddd',
	Modality: 'US',
	DateTime: '2024-07-16T14:26:34',
	ReferringPhysiciansName: '',
	NameofPhysiciansReading: 'DR01004',
	PerformingPhysiciansName: 'DR01004',
	LastSignOffExecuteTime: '',
	UserId: 'user',
	DoctorinCharge: 'user',
	Endoscopist1: 'user',
	Indication: '',
	DiagramData:
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=',
	DiagramMarkers: [],
	Other: '',
	OtherDescription: '',
	OccurrenceofComplication: '',
	PlannedforPartialColonoscopy: '',
	BowelPreparation: '',
	PostRighthemicolectomy: '',
	TechnicalDifficulties: '',
	MechanicalObstruction: '',
	IsCaecumReached: '',
	WithdrawalTime: 0,
	QualityOfBowelPreparation: '',
	QualityBowelScore: 0,
	BBPS_Left: -1,
	BBPS_Right: -1,
	BBPS_Transverse: -1,
	Sedation: [{ SedationDrug: '', SedationDosage: '', SedationDosageUnit: '' }],
	BowelPrepQuality: 'Excellent',
	ReportDate: '2024-07-16',
	TableBreastLesion: [
		{
			location: 'R_H',
			nature: '瑞克·格萊姆斯的妻子。是這一小隊倖存者的情感中樞，並且努力維持着他們的道德和行為。她是一位具有自我保護意識母親，不顧一切的保護她的兒子卡爾的安全，也因此對他人非常多疑，不易接近。與瑞克重逢後，她果斷地與肖恩·威爾士斷絕了關係。後來她懷孕了，但卻不知道孩子是瑞克的還是肖恩的。經過一番掙扎，她決定把孩子生下來，並向瑞克坦白了一切。',
			'cm-fm': '20',
			size: '40',
			'bi-RADS': 'Test',
		},
	],
};

const formDefine = {
	sections: [
		{
			id: 'sectionReportType',
			type: 'form',
			subSections: [
				{
					id: 'subSection_2',
					maxWidth: '50%',
					fields: [
						{
							id: 'ReportTemplate',
							label: 'Report Template',
							type: 'CodeListSelection',
							orientation: 'row',
							optionSource: {
								type: 'http',
								source: 'ReportTemplate',
								labelKey: 'label',
								key: 'value',
							},
							validate: {
								type: 'required',
							},
							labelStyle: {
								color: '#0070c0',
								fontFamily: 'Noto Sans TC',
								fontWeight: 'bold',
								fontSize: '10',
								backgroundColor: 'transparent',
							},
							valueStyle: {
								fontSize: '10',
								fontFamily: 'Noto Sans TC',
								fontWeight: 'bold',
								color: 'black',
							},
						},
					],
				},
			],
			maxWidth: '100%',
			hideInPDF: true,
			style: {
				backgroundColor: '#dadada',
			},
		},
		{
			id: 'sectionPatientInfo',
			type: 'form',
			subSections: [
				{
					id: 'subSection_1',
					maxWidth: '100%',
					fields: [],
				},
			],
			maxWidth: '100%',
			style: {
				backgroundColor: '#dadada',
				paddingTop: 0,
				paddingRight: 0,
				paddingBottom: 0,
				paddingLeft: 0,
			},
		},
	],
} as FormDefine;

const codeList = [
	{
		label: 'label1',
		value: 'value1',
	},
	{
		label: 'label2',
		value: 'value2',
	},
	{
		label: 'label3',
		value: 'value3',
	},
	{
		label: 'label4',
		value: 'value4',
	},
];

function App() {
	const [formData, setFormData] = useState(initialFormData);
	const isvReportRef = useRef<ISVReportHandle>(null);

	const handleButtonClick = () => {
		if (isvReportRef.current) {
			const currentFormData = isvReportRef.current.getFormData();
			console.log('Current FormData:', currentFormData);
		}
	};

	return (
		<RecoilRoot>
			<Button variant="contained" onClick={handleButtonClick}>
				獲取 Form Data
			</Button>
			<ISVReport
				ref={isvReportRef}
				formData={formData}
				formDefine={gridDefine}
				codeList={{
					ReportTemplate: codeList,
					Anesthesiologist: codeList,
				}}
			/>
		</RecoilRoot>
	);
}

export default App;
