import React from 'react';

import { Chip } from '@mui/material';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { LayoutType } from '../../../../field/field-type.ts';
import { formDefineAtom } from '../../../../recoil/atoms/formDefineAtoms.ts';
import {
	isFieldsetTemplateFocus,
	selectedAttributeTypeAtom,
	selectedDefineType,
} from '../../../../recoil/atoms/report-generator-atoms.ts';
import { Section } from '../../../../types/define.ts';
import FieldsetTemplate from '../FieldsetTemplate/FieldsetTemplate';
import ReportGeneratorSection from '../ReportGeneratorSection/ReportGeneratorSection';

interface Props {
	showGuideLine: boolean;
}

function ReportGeneratorPage({ showGuideLine }: Props) {
	const path = ['page'];
	const formDefine = useRecoilValue(formDefineAtom);
	const setSelectedAttributeType = useSetRecoilState(selectedAttributeTypeAtom);
	const setDefineType = useSetRecoilState(selectedDefineType);
	const [isFocus, setFocus] = useRecoilState(isFieldsetTemplateFocus(path));

	const onSetAttributePath = (e) => {
		e.stopPropagation();
		setDefineType('FormDefine');
		setSelectedAttributeType(LayoutType.Page);
		setFocus(false);
	};

	return (
		<FieldsetTemplate
			id="page"
			style={{
				margin: '4px 0',
				display: 'flex',
				flexWrap: 'wrap',
				width: '100%',
			}}
			showGuideLine={showGuideLine}
			isFocus={isFocus}
			legendComp={<Chip sx={{ cursor: 'pointer' }} size="small" color="warning" label="page" />}
			onClick={(e) => {
				onSetAttributePath(e);
			}}
		>
			{formDefine.sections?.map((section: Section, idx: number) => (
				<ReportGeneratorSection
					key={section.id}
					showGuideLine={showGuideLine}
					sectionIdx={idx}
					section={section}
				/>
			))}
		</FieldsetTemplate>
	);
}

export default React.memo(ReportGeneratorPage);
