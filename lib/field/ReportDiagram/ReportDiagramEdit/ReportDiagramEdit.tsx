import React from 'react';

import { Button, Stack } from '@mui/material';
import cx from 'classnames';
import * as R from 'ramda';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { fieldPathAtom } from '../../../recoil/atoms/formDefineAtoms.ts';
import { selectedAttributeAtom, selectedReportDefine } from '../../../recoil/atoms/report-generator-atoms.ts';
import { DiagramField } from '../../../types/field/diagram-field.ts';
import FileUpload from '../../../UI/FileUpload/FileUpload.tsx';
import classes from './ReportDiagramEdit.module.scss';

interface Props {
	field: DiagramField;
	value: string;
	onValueChange: (value: any) => void;
}

function ReportDiagramEdit({ field, value, onValueChange }: Props) {
	const fieldPath = useRecoilValue(fieldPathAtom(field.id));
	const setAttribute = useSetRecoilState(selectedAttributeAtom);
	const setFormDefine = useSetRecoilState(selectedReportDefine);

	const onSetAttribute = (attrValue: string) => {
		const path = ['defaultValue'];
		setAttribute((pre) => {
			return R.assocPath(path, attrValue, pre);
		});
		setFormDefine((pre) => {
			return R.assocPath([...fieldPath, ...path], attrValue, pre);
		});
	};

	const handleImageChange = (file: File) => {
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				onSetAttribute(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleClear = () => {
		onSetAttribute('');
	};

	return (
		<div style={{ height: field.height, width: field.width }} className={cx(classes.imageContainer)}>
			<img src={field.defaultValue} alt="None" />
			<Stack spacing="2px" direction="row" width="100%" mt="2px">
				<FileUpload
					accept={'image/*'}
					uiComponent={
						<Button size="small" variant="contained" color="primary" component="span">
							Select
						</Button>
					}
					onFileChange={handleImageChange}
				/>
				<Button size="small" variant="contained" color="error" component="span" onClick={handleClear}>
					Clear
				</Button>
			</Stack>
		</div>
	);
}

export default ReportDiagramEdit;
