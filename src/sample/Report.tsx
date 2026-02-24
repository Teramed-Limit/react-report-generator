import { useCallback, useMemo, useRef, useState } from 'react';

import { Button, Stack } from '@mui/material';

import { FormFieldType } from '../../lib/field/field-type.ts';
import { ISVReport, PureFieldContainer, ValueChangeSubscription } from '../../lib/main.ts';
import CustomModal from '../../lib/modals/CustomModal/CustomModal.tsx';
import { Field } from '../../lib/types';
import { ISVReportHandle } from '../../lib/types/component-handle';
import { codeList } from '../constant/code-list.ts';
import { useFormDefine } from '../hooks/useFormDefine.ts';
import { useModalControl } from '../hooks/useModalControl.ts';

import ReportPDF from './ReportPDF.tsx';

const testField: Field = {
	id: 'DescriptionOfSites',
	type: FormFieldType.CodeListLexicon,
	hide: false,
	hideInPDF: false,
	label: 'Site',
	labelWidth: '35%',
	labelStyle: {
		backgroundColor: 'transparent',
		color: '#0070c0',
		fontSize: 9,
		fontFamily: 'Noto Sans TC',
		fontStyle: 'normal',
		fontWeight: 'bold',
		textAlign: 'left',
		textDecoration: 'none',
		marginTop: 0,
		marginRight: 0,
		marginBottom: 0,
		marginLeft: 0,
		paddingTop: 0,
		paddingRight: 0,
		paddingBottom: 0,
		paddingLeft: 0,
	},
	valueStyle: {
		backgroundColor: 'transparent',
		color: 'black',
		fontSize: 9,
		fontFamily: 'Noto Sans TC',
		fontStyle: 'normal',
		fontWeight: 'bold',
		textAlign: 'center',
		textDecoration: 'none',
		marginTop: 0,
		marginRight: 0,
		marginBottom: 0,
		marginLeft: 0,
		paddingTop: 0,
		paddingRight: 0,
		paddingBottom: 0,
		paddingLeft: 0,
	},
	defaultValue: '',
	initMapping: '',
	orientation: 'row',
	readOnly: false,
	buttonBar: [],
	validate: {
		type: 'none',
	},
	hint: '',
	hideLabel: false,
	optionSource: {
		type: 'http',
		source: 'ImageSites',
		labelKey: '',
		key: '',
	},
	filterCondition: {
		filterById: '',
		filterOptionKey: '',
	},
	maxLength: 1000,
};

function Report() {
	const [testValue, setTestValue] = useState('test');
	const { isModalOpen, openModal, closeModal } = useModalControl();
	const isvReportRef = useRef<ISVReportHandle>();

	const { formData, setFormData, formDefine, imageDefine, headerDefine, footerDefine, loadFormDefine } =
		useFormDefine();

	// 儲存報告，拿到表單資料
	const saveReportData = () => {
		const formState = isvReportRef.current?.getFormState() || {};
		const isFormValidate = isvReportRef.current?.isFormValid();
		console.log('Form Data:', isvReportRef.current?.getFormData());
		console.log('Form State:', formState);
		console.log(isFormValidate);
		setFormData(isvReportRef.current?.getFormData() || {});
	};

	// 根據表單定義，產生 PDF
	const printPDF = () => {
		saveReportData();
		openModal();
	};

	// 訂閱欄位值變動
	const handlePatientIdChange = useCallback((value: unknown, fieldId: string) => {
		console.log(`[ValueChangeSubscription] ${fieldId} changed:`, value);
	}, []);

	const valueChangeSubscriptions = useMemo<ValueChangeSubscription[]>(
		() => [{ fieldId: 'PatientsAge', onChange: handlePatientIdChange }],
		[handlePatientIdChange],
	);

	return (
		<>
			<Stack
				direction="row"
				spacing={2}
				sx={{
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Button variant="contained" onClick={saveReportData}>
					Save
				</Button>
				<Button variant="contained" onClick={printPDF}>
					Print PDF
				</Button>
			</Stack>

			{formDefine && formData && (
				<ISVReport
					ref={isvReportRef}
					formData={formData}
					formDefine={formDefine}
					formDisabled={false}
					defineChangeTriggerId="ReportTemplate"
					defineChangeTriggerCallBack={loadFormDefine}
					codeList={codeList as any}
					structReportParseApi="http://localhost:61818/api/structureReport/load"
					showFlowButton
					valueChangeSubscriptions={valueChangeSubscriptions}
					buttonActionMap={{
						createTemplate: (field: Field) => {
							window.alert('Create Template');
						},
					}}
				>
					<PureFieldContainer
						id="test"
						field={testField}
						value={testValue}
						onValueChange={(text: string) => {
							console.log(text);
							setTestValue(text);
						}}
					/>
				</ISVReport>
			)}
			<CustomModal width="90%" height="90%" label="" open={isModalOpen} onModalClose={closeModal}>
				<ReportPDF
					formData={formData}
					formDefine={formDefine}
					headerDefine={headerDefine}
					footerDefine={footerDefine}
					imageDefine={imageDefine}
				/>
			</CustomModal>
		</>
	);
}

export default Report;
