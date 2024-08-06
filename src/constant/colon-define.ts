export const colonoscopyDefine: any = {
	sections: [
		{
			id: 'sectionReportType',
			type: 'form',
			isHeader: false,
			subSections: [
				{
					id: 'subSection1',
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
							},
							validate: {
								type: 'required',
							},
							labelStyle: {
								color: '#0070c0',
								fontFamily: 'Noto Sans TC',
								fontSize: 9,
								fontWeight: 'bold',
							},
							valueStyle: {
								fontFamily: 'Noto Sans TC',
								fontSize: 9,
								fontWeight: 'bold',
								color: 'black',
							},
						},
					],
				},
				{
					id: 'subSection2',
					maxWidth: '50%',
					fields: [],
				},
			],
			maxWidth: '100%',
			hideInPDF: true,
		},
		{
			id: 'sectionPatientInfo',
			type: 'form',
			subSections: [
				{
					id: 'subSection_1',
					maxWidth: '50%',
					fields: [
						{
							id: 'PatientsName',
							label: 'Patient Name',
							orientation: 'row',
							type: 'Text',
							readOnly: true,
							labelStyle: {
								color: '#0070c0',
								fontFamily: 'Noto Sans TC',
								fontWeight: 'bold',
								fontSize: 9,
							},
							valueStyle: {
								fontSize: 9,
								fontFamily: 'Noto Sans TC',
								fontWeight: 'bold',
								color: 'black',
							},
						},
						{
							id: 'AccessionNumber',
							type: 'Text',
							label: 'Patient No.',
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
							defaultValue: '',
							initMapping: '',
							orientation: 'row',
							readOnly: true,
							buttonBar: [],
							validate: {
								type: 'none',
							},
							hint: '',
							hideLabel: false,
							fromModal: '',
							placeholder: '',
							suffix: '',
							prefix: '',
						},
						{
							id: 'PatientId',
							type: 'Text',
							label: 'ID No.',
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
							defaultValue: '',
							initMapping: '',
							orientation: 'row',
							readOnly: true,
							buttonBar: [],
							validate: {
								type: 'none',
							},
							hint: '',
							hideLabel: false,
							fromModal: '',
							placeholder: '',
							suffix: '',
							prefix: '',
						},
						{
							id: 'PatientsSex',
							type: 'Text',
							label: 'Gender',
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
							defaultValue: '',
							initMapping: '',
							orientation: 'row',
							readOnly: true,
							buttonBar: [],
							validate: {
								type: 'none',
							},
							hint: '',
							hideLabel: false,
							fromModal: '',
							placeholder: '',
							suffix: '',
							prefix: '',
						},
						{
							id: 'PatientsBirthDate',
							type: 'DatePicker',
							label: 'Date of Birth',
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
							defaultValue: '',
							initMapping: 'PatientsBirthDate',
							orientation: 'row',
							readOnly: true,
							buttonBar: [],
							validate: {
								type: 'none',
							},
							hint: '',
							hideLabel: false,
							fromModal: '',
							defaultToday: false,
							fromFormat: 'yyyyMMdd',
							toFormat: 'dd/MM/yyyy',
						},
						{
							id: 'PatientsAge',
							type: 'Text',
							label: 'Age',
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
							defaultValue: '',
							initMapping: '',
							orientation: 'row',
							readOnly: true,
							buttonBar: [],
							validate: {
								type: 'none',
							},
							hint: '',
							hideLabel: false,
							fromModal: '',
							placeholder: '',
							suffix: '',
							prefix: '',
						},
					],
				},
				{
					id: 'subSection_2',
					maxWidth: '50%',
					fields: [
						{
							id: 'StudyDate',
							type: 'DatePicker',
							label: 'Date of Procedure',
							labelWidth: '35%',
							labelStyle: {
								color: '#0070c0',
								fontFamily: 'Noto Sans TC',
								fontWeight: 'bold',
								fontSize: 9,
							},
							valueStyle: {
								fontSize: 9,
								fontFamily: 'Noto Sans TC',
								fontWeight: 'bold',
								color: 'black',
							},
							defaultValue: '',
							initMapping: 'StudyDate',
							orientation: 'row',
							readOnly: false,
							buttonBar: [],
							validate: {
								type: 'none',
							},
							hint: '',
							hideLabel: false,
							fromModal: '',
							defaultToday: false,
							fromFormat: 'yyyyMMdd',
							toFormat: 'dd/MM/yyyy',
						},
						{
							id: 'DoctorinCharge',
							type: 'CodeListSelection',
							label: 'Doctor in Charge',
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
							defaultValue: '',
							initMapping: 'UserId',
							orientation: 'row',
							readOnly: false,
							buttonBar: [],
							validate: {
								type: 'none',
							},
							hint: '',
							hideLabel: false,
							fromModal: '',
							isMulti: false,
							optionSource: {
								type: 'http',
								source: 'UserAccount',
							},
							filterCondition: {
								filterById: '',
								filterOptionKey: '',
							},
							joinStr: ',',
							fetchLatest: true,
						},
						{
							id: 'Endoscopist1',
							type: 'CodeListSelection',
							label: 'Endoscopist',
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
							defaultValue: '',
							initMapping: 'UserId',
							orientation: 'row',
							readOnly: false,
							buttonBar: [],
							validate: {
								type: 'none',
							},
							hint: '',
							hideLabel: false,
							fromModal: '',
							isMulti: false,
							optionSource: {
								type: 'http',
								source: 'UserAccount',
							},
							filterCondition: {
								filterById: '',
								filterOptionKey: '',
							},
							joinStr: ',',
							fetchLatest: true,
						},
						{
							id: 'Anesthesiologist',
							type: 'CodeListSelection',
							label: 'Mac by Anesthetist',
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
							fromModal: '',
							isMulti: true,
							optionSource: {
								type: 'http',
								source: 'Anaesthetist',
							},
							filterCondition: {
								filterById: '',
								filterOptionKey: '',
							},
							joinStr: ',',
							fetchLatest: false,
						},
						{
							id: 'ReferringPhysiciansName',
							type: 'Text',
							label: 'Referring Doctor',
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
							defaultValue: '',
							initMapping: '',
							orientation: 'row',
							readOnly: true,
							buttonBar: [],
							validate: {
								type: 'none',
							},
							hint: '',
							hideLabel: false,
							fromModal: '',
							placeholder: '',
							suffix: '',
							prefix: 'Dr.',
						},
					],
				},
			],
			maxWidth: '100%',
			isHeader: true,
		},
		{
			id: 'sectionFindings',
			type: 'form',
			maxWidth: '70%',
			subSections: [
				{
					id: 'SubSection-5',
					maxWidth: '100%',
					fields: [
						{
							id: 'Sedation',
							type: 'Array',
							orientation: 'row',
							templateField: {
								id: 'Sedation',
								label: 'Medication',
								compositeOrientation: 'row',
								orientation: 'row',
								type: 'Composite',
								labelStyle: {
									color: '#218cc5',
									fontFamily: 'Noto Sans TC',
									fontSize: 9,
									fontWeight: 'bold',
								},
								fields: [
									{
										id: 'SedationDrug',
										orientation: 'row',
										type: 'CodeListSelection',
										optionSource: {
											type: 'http',
											source: 'Sedation',
										},
										valueChangedEvent: {
											event: 'ChangeOtherArrayValue',
											eventParams: [
												{
													condition: [
														{
															type: 'equal',
															value: 'Buscopan',
														},
													],
													targetId: 'SedationDosageUnit',
													targetValue: 'mg',
												},
												{
													condition: [
														{
															type: 'equal',
															value: 'Midazolam',
														},
													],
													targetId: 'SedationDosageUnit',
													targetValue: 'mg',
												},
												{
													condition: [
														{
															type: 'equal',
															value: 'Fentanyl',
														},
													],
													targetId: 'SedationDosageUnit',
													targetValue: 'mcg',
												},
												{
													condition: [
														{
															type: 'equal',
															value: 'Pethidine',
														},
													],
													targetId: 'SedationDosageUnit',
													targetValue: 'mg',
												},
												{
													condition: [
														{
															type: 'equal',
															value: 'Dormicum',
														},
													],
													targetId: 'SedationDosageUnit',
													targetValue: 'mg',
												},
											],
										},
										valueStyle: {
											fontFamily: 'Noto Sans TC',
											fontSize: 9,
											fontWeight: 'bold',
											color: 'black',
										},
									},
									{
										id: 'SedationDosage',
										orientation: 'row',
										type: 'Text',
										valueStyle: {
											alignSelf: 'flex-end',
											paddingRight: 0,
											fontFamily: 'Noto Sans TC',
											fontSize: 9,
											fontWeight: 'bold',
											color: 'black',
											paddingLeft: 0,
											paddingBottom: 0,
											paddingTop: 0,
											marginLeft: 0,
											marginBottom: 0,
											marginRight: 0,
											marginTop: 0,
										},
									},
									{
										id: 'SedationDosageUnit',
										orientation: 'row',
										type: 'CodeListSelection',
										optionSource: {
											type: 'http',
											source: 'Dosage',
										},
										valueStyle: {
											fontFamily: 'Noto Sans TC',
											fontSize: 9,
											fontWeight: 'bold',
											color: 'black',
											marginTop: 0,
											marginRight: 0,
											marginBottom: 0,
											marginLeft: 0,
											paddingTop: 0,
											paddingRight: 0,
											paddingBottom: 0,
											paddingLeft: 0,
										},
									},
								],
							},
							labelStyle: {
								color: '#218cc5',
								fontSize: 9,
							},
							valueStyle: {
								fontSize: 9,
							},
						},
					],
					style: {
						marginBottom: 3,
					},
				},
				{
					id: 'SubSection-6',
					maxWidth: '100%',
					fields: [
						{
							id: 'ProceduresComposite',
							label: 'Procedure',
							orientation: 'row',
							compositeOrientation: 'column',
							type: 'Composite',
							labelStyle: {
								color: '#218cc5',
								fontFamily: 'Noto Sans TC',
								fontSize: 9,
								fontWeight: 'bold',
							},
							fields: [
								{
									id: 'ProceduresDataset',
									label: 'Procedure',
									orientation: 'row',
									type: 'CodeListSelection',
									isMulti: true,
									joinStr: '\n',
									optionSource: {
										type: 'http',
										source: 'Procedure',
									},
									filterCondition: {
										filterById: 'ReportTemplate',
										filterOptionKey: 'ParentCodeValue',
									},
									valueStyle: {
										fontFamily: 'Noto Sans TC',
										fontSize: 9,
										fontWeight: 'bold',
										color: 'black',
									},
								},
								{
									id: 'ProcedureExtra',
									label: 'Other Procedure',
									orientation: 'row',
									type: 'TextArea',
									rows: 2,
									placeholder: 'Other Procedure',
									valueStyle: {
										fontFamily: 'Noto Sans TC',
										fontSize: 9,
										fontWeight: 'bold',
										color: 'black',
									},
								},
							],
							valueStyle: {
								fontSize: 9,
							},
						},
					],
					style: {
						marginBottom: '4px',
					},
				},
				{
					id: 'subSection1',
					maxWidth: '100%',
					fields: [
						{
							id: 'IndicationComposite',
							label: 'Indication',
							orientation: 'row',
							compositeOrientation: 'column',
							type: 'Composite',
							labelStyle: {
								alignSelf: 'flex-start',
								color: '#218cc5',
								fontFamily: 'Noto Sans TC',
								fontSize: 10,
								fontWeight: 'bold',
								marginBottom: 0,
							},
							fields: [
								{
									id: 'Indication',
									label: 'Indication',
									orientation: 'row',
									type: 'CodeListLexiconInput',
									optionSource: {
										type: 'http',
										source: 'Indication',
									},
									valueStyle: {
										fontFamily: 'Noto Sans TC',
										fontSize: 9,
										fontWeight: 'bold',
										color: 'black',
									},
									filterCondition: {
										filterById: 'ReportTemplate',
										filterOptionKey: 'ParentCodeValue',
									},
								},
								{
									id: 'IndicationOptional',
									label: 'Other Indication',
									orientation: 'row',
									type: 'TextArea',
									rows: 2,
									placeholder: 'Other Indication',
									valueStyle: {
										fontFamily: 'Noto Sans TC',
										fontSize: 9,
										fontWeight: 'bold',
										color: 'black',
									},
								},
							],
							valueStyle: {
								fontSize: 9,
							},
						},
					],
					style: {
						marginBottom: '4px',
					},
				},
				{
					id: 'subSection2',
					maxWidth: '100%',
					fields: [
						{
							id: 'Findings',
							label: 'Findings',
							type: 'TextArea',
							orientation: 'row',
							rows: 4,
							labelStyle: {
								color: '#218cc5',
								fontFamily: 'Noto Sans TC',
								fontSize: 9,
								fontWeight: 'bold',
							},
							valueStyle: {
								paddingLeft: '0',
								fontFamily: 'Noto Sans TC',
								fontSize: 9,
								fontWeight: 'bold',
								color: 'black',
							},
							buttonBar: [
								{
									id: 'createTemplate',
									label: 'Create Template',
									action: 'createTemplate',
								},
								{
									id: 'retrieveTemplate',
									label: 'Retrieve Template',
									action: 'openModal',
									actionParams: {
										modalName: 'retrieveTemplate',
									},
								},
								{
									id: 'fillInDetails',
									label: 'Fill in details',
									action: 'openModal',
									actionParams: {
										modalName: 'fillInDetails',
									},
								},
							],
						},
					],
					style: {
						marginBottom: '4px',
					},
				},
				{
					id: 'subSection3',
					maxWidth: '100%',
					fields: [
						{
							id: 'BowelPrepQuality',
							label: 'Bowel Prep',
							type: 'Radio',
							orientation: 'row',
							valueStyle: {
								paddingLeft: '0',
								fontFamily: 'Noto Sans TC',
								fontSize: 9,
								fontWeight: 'bold',
								color: 'black',
							},
							optionSource: {
								type: 'http',
								source: 'Bowel-Quality-V2',
							},
							labelStyle: {
								alignSelf: 'flex-start',
								color: '#218cc5',
								fontFamily: 'Noto Sans TC',
								fontSize: 9,
								fontWeight: 'bold',
							},
						},
					],
					style: {
						marginBottom: '4px',
					},
				},
			],
			labelStyle: {
				fontSize: 9,
			},
		},
		{
			id: 'sectionDiagrams',
			type: 'form',
			maxWidth: '30%',
			subSections: [
				{
					id: 'subSection1',
					maxWidth: '100%',
					fields: [
						{
							id: 'DiagramData',
							orientation: 'row',
							type: 'ReportDiagram',
							hideLabel: true,
							imageSource: {
								type: 'base64',
							},
							labelStyle: {
								fontSize: 9,
								color: '#218cc5',
							},
							valueStyle: {
								fontSize: 9,
							},
							hideToolbar: true,
						},
					],
					style: {
						marginTop: '10px',
					},
				},
			],
		},
		{
			id: 'sectionDiagnosis',
			type: 'form',
			maxWidth: '100%',
			subSections: [
				{
					id: 'subSection1',
					maxWidth: '100%',
					fields: [
						{
							id: 'Diagnosis',
							label: 'Diagnosis',
							type: 'Composite',
							orientation: 'row',
							compositeOrientation: 'column',
							labelStyle: {
								color: '#218cc5',
								alignSelf: 'flex-start',
								fontFamily: 'Noto Sans TC',
								fontSize: 9,
								fontWeight: 'bold',
							},
							fields: [
								{
									id: 'DiagnosisDataset',
									type: 'CodeListSelection',
									orientation: 'row',
									isMulti: true,
									joinStr: ', ',
									optionSource: {
										type: 'http',
										source: 'Diagnosis',
									},
									filterCondition: {
										filterById: 'ReportTemplate',
										filterOptionKey: 'ParentCodeValue',
									},
									valueStyle: {
										paddingLeft: '0',
										fontFamily: 'Noto Sans TC',
										fontSize: 9,
										fontWeight: 'bold',
										color: 'black',
									},
								},
								{
									id: 'DiagnosisExtra',
									type: 'TextArea',
									orientation: 'column',
									rows: 2,
									placeholder: 'Other Diagnosis',
									valueStyle: {
										paddingLeft: '0',
										fontFamily: 'Noto Sans TC',
										fontSize: 9,
										fontWeight: 'bold',
										color: 'black',
									},
									buttonBar: [
										{
											id: 'createTemplate',
											label: 'Create Template',
											action: 'createTemplate',
										},
										{
											id: 'retrieveTemplate',
											label: 'Retrieve Template',
											action: 'openModal',
											actionParams: {
												modalName: 'retrieveTemplate',
											},
										},
										{
											id: 'fillInDetails',
											label: 'Fill in details',
											action: 'openModal',
											actionParams: {
												modalName: 'fillInDetails',
											},
										},
									],
								},
							],
							valueStyle: {
								fontSize: 9,
							},
							labelWidth: '24.5%',
							hideToolbar: true,
						},
					],
					style: {
						marginBottom: '4px',
					},
				},
			],
		},
		{
			id: 'sectionSpecimenDescription',
			type: 'form',
			maxWidth: '100%',
			subSections: [
				{
					id: 'subSection1',
					maxWidth: '100%',
					fields: [
						{
							id: 'SpecimenDescription',
							label: 'Specimen Description',
							type: 'TextArea',
							orientation: 'row',
							labelStyle: {
								color: '#218cc5',
								fontFamily: 'Noto Sans TC',
								fontSize: 9,
								fontWeight: 'bold',
							},
							valueStyle: {
								paddingLeft: '0',
								fontFamily: 'Noto Sans TC',
								fontSize: 9,
								fontWeight: 'bold',
								color: 'black',
							},
							maxLength: 1024,
							labelWidth: '24.5%',
							rows: 4,
						},
					],
					style: {
						marginBottom: '4px',
						marginRight: '',
					},
				},
			],
		},
		{
			id: 'sectionRecommendations',
			type: 'form',
			maxWidth: '100%',
			subSections: [
				{
					id: 'subSection1',
					maxWidth: '100%',
					fields: [
						{
							id: 'Recommendations',
							label: 'Recommendations',
							type: 'TextArea',
							orientation: 'row',
							labelStyle: {
								color: '#218cc5',
								fontFamily: 'Noto Sans TC',
								fontSize: 9,
								fontWeight: 'bold',
							},
							valueStyle: {
								paddingLeft: '0',
								paddingBottom: '0',
								fontFamily: 'Noto Sans TC',
								fontSize: 9,
								fontWeight: 'bold',
								color: 'black',
							},
							maxLength: 1024,
							labelWidth: '24.5%',
							rows: 4,
						},
					],
					style: {
						marginBottom: '4px',
					},
				},
			],
		},
	],
};
