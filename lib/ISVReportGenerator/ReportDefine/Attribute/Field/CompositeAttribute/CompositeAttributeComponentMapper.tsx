import { ComponentType } from 'react';

import { FormFieldType } from '../../../../../field/field-type';
import { FieldAttributeComponentProps } from '../../FieldAttributeComponentProps.tsx';
import CheckBoxAttributeComponent from '../CheckBoxAttribute/CheckBoxAttributeComponent';
import CodeListLexiconAttributeComponent from '../CodeListLexiconAttribute/CodeListLexiconAttributeComponent';
import CodeListSelectionAttributeComponent from '../CodeListSelectionAttribute/CodeListSelectionAttributeComponent';
import DatePickerAttributeComponent from '../DatePickerAttribute/DatePickerAttributeComponent';
import NumberAttributeComponent from '../NumberAttribute/NumberAttributeComponent';
import RadioAttributeComponent from '../RadioAttribute/RadioAttributeComponent';
import SRTextAttributeComponent from '../SRTextAttribute/SRTextAttributeComponent';
import ReportTextAreaAttribute from '../TextAreaAttribute/TextAreaAttributeComponent';
import TextAttributeComponent from '../TextAttribute/TextAttributeComponent';
import ReportTimePickerAttribute from '../TimePickerAttribute/TimePickerAttributeComponent';

type ComponentTypeMap = {
	[key: string]: ComponentType<FieldAttributeComponentProps<any>>;
};
export const CompositeAttributeComponentMapper: ComponentTypeMap = {
	[FormFieldType.Text]: TextAttributeComponent,
	[FormFieldType.Number]: NumberAttributeComponent,
	[FormFieldType.TextArea]: ReportTextAreaAttribute,
	[FormFieldType.CodeListSelection]: CodeListSelectionAttributeComponent,
	[FormFieldType.CodeListLexicon]: CodeListLexiconAttributeComponent,
	[FormFieldType.Radio]: RadioAttributeComponent,
	[FormFieldType.Checkbox]: CheckBoxAttributeComponent,
	[FormFieldType.DatePicker]: DatePickerAttributeComponent,
	[FormFieldType.TimePicker]: ReportTimePickerAttribute,
	[FormFieldType.SRText]: SRTextAttributeComponent,
};
