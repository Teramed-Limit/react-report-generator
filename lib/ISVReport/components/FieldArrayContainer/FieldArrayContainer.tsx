import React, { useCallback, useEffect } from 'react';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Box, Button, IconButton, Stack } from '@mui/material';
import * as R from 'ramda';
import { useRecoilTransaction_UNSTABLE, useRecoilValue } from 'recoil';

import { FormFieldType } from '../../../field/field-type.ts';
import { formDisabledAtom, formStatesAtom, formValuesAtom, valueAtom } from '../../../recoil/atoms/formDataAtoms.ts';
import { ValidationService } from '../../../service/validation/validation-service.ts';
import { ArrayField } from '../../../types/field/array-field.ts';
import { CompositeField } from '../../../types/field/composite-field.ts';
import { Field } from '../../../types/field/field.ts';
import { FormControlArray } from '../../../types/form-state.ts';
import FieldCompositeContainer from '../FieldCompositeContainer/FieldCompositeContainer.tsx';
import FieldContainer from '../FieldContainer/FieldContainer.tsx';

import classes from './FieldArrayContainer.module.scss';

interface Props {
	field: ArrayField;
}

const GenerateArrayFieldId = (fieldId: string, idx: number) => `${fieldId}_${idx}`;

function FieldArrayContainer({ field: arrayField }: Props) {
	const formDisabled = useRecoilValue(formDisabledAtom);
	const arrayValue = useRecoilValue(valueAtom([arrayField.id]));

	const setArrayValue = useRecoilTransaction_UNSTABLE(
		({ get, set }) =>
			(action: string, index: number, newFieldValue: any) => {
				const currentFormValues = get(formValuesAtom);
				const updatedFormValues = R.assocPath([arrayField.id], newFieldValue, currentFormValues);
				set(formValuesAtom, updatedFormValues);

				if (action === 'add') {
					handleAddAction(get, set);
				} else if (action === 'delete') {
					handleDeleteAction(get, set, index);
				}
			},
	);

	function handleAddAction(get: any, set: any) {
		const currentFormStates = get(formStatesAtom);
		const currentFieldState = currentFormStates[arrayField.id] as FormControlArray;
		let updatedFieldState;

		if (arrayField.templateField.type === FormFieldType.Composite) {
			updatedFieldState = handleCompositeAdd(currentFieldState);
		} else {
			updatedFieldState = handleSimpleAdd(currentFieldState);
		}

		set(formStatesAtom, {
			...currentFormStates,
			[arrayField.id]: updatedFieldState,
		});
	}

	function handleCompositeAdd(currentFieldState: FormControlArray) {
		const newState = {};
		const compositeField = arrayField.templateField as CompositeField;

		compositeField.fields.forEach((field) => {
			const validationService = new ValidationService();
			const { isValid, errorMessage } = validationService.validate('', field.validate, {} as Record<string, any>);
			newState[field.id] = { isDirty: false, isValid, errorMessage };
		});

		return R.append(newState, currentFieldState);
	}

	function handleSimpleAdd(currentFieldState: FormControlArray) {
		const simpleField = arrayField.templateField as Field;
		const validationService = new ValidationService();
		const { isValid, errorMessage } = validationService.validate(
			'',
			simpleField.validate,
			{} as Record<string, any>,
		);
		return R.append(
			{
				[arrayField.templateField.id]: {
					isDirty: false,
					isValid,
					errorMessage,
				},
			},
			currentFieldState,
		);
	}

	function handleDeleteAction(get: any, set: any, index: number) {
		const currentFormStates = get(formStatesAtom);
		const updatedFormStates = R.dissocPath([arrayField.id, index], currentFormStates);
		set(formStatesAtom, updatedFormStates);
	}

	// 新增一欄的初始值
	const newTemplateValue = useCallback(() => {
		const addedValue = {};
		if (arrayField.templateField.type === FormFieldType.Composite) {
			(arrayField.templateField as CompositeField).fields.forEach((field) => {
				addedValue[field.id] = '';
			});
		} else {
			addedValue[arrayField.templateField.id] = '';
		}

		return addedValue;
	}, [arrayField.templateField]);

	// 新增一欄
	const addField = useCallback(() => {
		setArrayValue('add', arrayValue.length, R.append(newTemplateValue(), arrayValue));
	}, [arrayValue, newTemplateValue, setArrayValue]);

	// 刪除一欄
	const deleteField = useCallback(
		(idx: number) => {
			setArrayValue('delete', idx, R.remove(idx, 1, arrayValue));
		},
		[arrayValue, setArrayValue],
	);

	// 如果一開始沒有值，則新增一欄
	useEffect(() => {
		if (!arrayValue || arrayValue.length === 0) {
			addField();
		}
	}, [addField, arrayValue]);

	const deleteFieldComp = (idx: number) => {
		return (
			<span className={classes.iconSpan}>
				<IconButton className={classes.icon} size="small" color="error" onClick={() => deleteField(idx)}>
					<RemoveCircleIcon sx={{ fontSize: '14px' }} />
				</IconButton>
			</span>
		);
	};

	return (
		<Stack id={`fieldArrayContainer__${arrayField.id}`} direction={arrayField.arrayOrientation || 'column'}>
			{(arrayValue || [newTemplateValue()]).map((_: any, idx: number) => {
				switch (arrayField.templateField.type) {
					case FormFieldType.Composite:
						return (
							<FieldCompositeContainer
								key={`${arrayField.templateField.id}_${idx.toString()}`}
								id={GenerateArrayFieldId(arrayField.templateField.id, idx)}
								field={
									{
										...arrayField.templateField,
										id: GenerateArrayFieldId(arrayField.templateField.id, idx),
										label: `${arrayField.templateField.label} ${idx + 1}`,
									} as CompositeField
								}
								appendValueChangedId={[arrayField.id, idx]}
								suffixComp={deleteFieldComp(idx)}
							/>
						);
					default:
						return (
							<FieldContainer
								key={`${arrayField.templateField.id}_${idx.toString()}`}
								id={GenerateArrayFieldId(arrayField.templateField.id, idx)}
								field={{
									...arrayField.templateField,
									id: GenerateArrayFieldId(arrayField.templateField.id, idx),
									label: `${arrayField.templateField.label} ${idx + 1}`,
								}}
								valueChangedId={[arrayField.id, idx, arrayField.templateField.id]}
								suffixComp={deleteFieldComp(idx)}
							/>
						);
				}
			})}
			<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button
					size="small"
					disabled={formDisabled}
					sx={{
						width:
							arrayField.orientation === 'column'
								? '100%'
								: `calc(100% - ${arrayField.templateField.labelWidth || '35%'})`,
						textTransform: 'none',
						marginTop: '2px',
						marginBottom: '2px',
					}}
					variant="contained"
					onClick={addField}
				>
					Add {arrayField.templateField.label}
				</Button>
			</Box>
		</Stack>
	);
}

export default React.memo(FieldArrayContainer);
