import { useEffect, useState } from 'react';

import { Box, Stack } from '@mui/material';
import { useSetRecoilState } from 'recoil';

import '@mui/material/styles/styled';
import { codeListMapAtom, formDisabledAtom, formValuesAtom } from '../../recoil/atoms/formAtoms.ts';
import { FormDefine, Section } from '../../types/define.ts';
import { ReportSection } from '../ReportSection';
import { reportPage } from './style.ts';
import classes from './styles.module.scss';

interface Props {
	formDefine: FormDefine;
	formData: Record<string, any>;
	formDisabled?: boolean;
	codeList: Record<string, any[]>;
}

export function ISVReport({ formDefine, formData, formDisabled, codeList }: Props) {
	const setFormData = useSetRecoilState(formValuesAtom);
	const setFormDisabled = useSetRecoilState(formDisabledAtom);
	const setCodeListMap = useSetRecoilState(codeListMapAtom);

	const [isFormDataSet, setIsFormDataSet] = useState(false);
	const [isFormDisabledSet, setIsFormDisabledSet] = useState(false);
	const [isCodeListSet, setIsCodeListSet] = useState(false);

	useEffect(() => {
		setFormData(formData);
		setIsFormDataSet(true);
	}, [formData, setFormData]);

	useEffect(() => {
		setFormDisabled(formDisabled || false);
		setIsFormDisabledSet(true);
	}, [formDisabled, setFormDisabled]);

	useEffect(() => {
		setCodeListMap(codeList);
		setIsCodeListSet(true);
	}, [codeList, setCodeListMap]);

	const allEffectsCompleted = isFormDataSet && isFormDisabledSet && isCodeListSet;

	if (!allEffectsCompleted) {
		return null; // 或者可以顯示一個 loading 狀態
	}

	return (
		<Stack direction="row" sx={{ position: 'relative' }}>
			<Box className={classes.reportLayout} sx={reportPage}>
				<Box className={classes.page}>
					{formDefine.sections
						.filter((section: Section) => !section.hide)
						.map((section: Section) => (
							<ReportSection key={section.id} section={section} />
						))}
				</Box>
			</Box>
		</Stack>
	);
}
