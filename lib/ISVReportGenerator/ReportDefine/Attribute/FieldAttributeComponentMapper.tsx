import { ComponentType } from 'react';

import { FormFieldType, LayoutType } from '../../../field/field-type';

import ArrayAttributeComponent from './Field/ArrayAttribute/ArrayAttributeComponent.tsx';
import CheckBoxAttributeComponent from './Field/CheckBoxAttribute/CheckBoxAttributeComponent.tsx';
import CodeListLexiconAttributeComponent from './Field/CodeListLexiconAttribute/CodeListLexiconAttributeComponent.tsx';
import CodeListSelectionAttributeComponent from './Field/CodeListSelectionAttribute/CodeListSelectionAttributeComponent.tsx';
import CompositeAttributeComponent from './Field/CompositeAttribute/CompositeAttributeComponent.tsx';
import DatePickerAttributeComponent from './Field/DatePickerAttribute/DatePickerAttributeComponent.tsx';
import DiagramAttributeComponent from './Field/DiagramAttribute/DiagramAttributeComponent.tsx';
import NumberAttributeComponent from './Field/NumberAttribute/NumberAttributeComponent.tsx';
import RadioAttributeComponent from './Field/RadioAttribute/RadioAttributeComponent.tsx';
import SRTextAttributeComponent from './Field/SRTextAttribute/SRTextAttributeComponent.tsx';
import ReportTextAreaAttribute from './Field/TextAreaAttribute/TextAreaAttributeComponent.tsx';
import TextAttributeComponent from './Field/TextAttribute/TextAttributeComponent.tsx';
import ReportTimePickerAttribute from './Field/TimePickerAttribute/TimePickerAttributeComponent.tsx';
import { FieldAttributeComponentProps } from './FieldAttributeComponentProps.tsx';
import PageAttribute from './Layout/PageAttribute/PageAttribute.tsx';
import SectionAttributeComponent from './Layout/SectionAttribute/SectionAttributeComponent.tsx';
import SubSectionAttributeComponent from './Layout/SubSectionAttribute/SubSectionAttributeComponent.tsx';

type ComponentTypeMap = {
	[key: string]: ComponentType<FieldAttributeComponentProps<any>>;
};
export const FieldAttributeComponentMapper: ComponentTypeMap = {
	[LayoutType.Page]: PageAttribute,
	[LayoutType.Section]: SectionAttributeComponent,
	[LayoutType.SubSection]: SubSectionAttributeComponent,
	[FormFieldType.Text]: TextAttributeComponent,
	[FormFieldType.Number]: NumberAttributeComponent,
	[FormFieldType.TextArea]: ReportTextAreaAttribute,
	[FormFieldType.CodeListSelection]: CodeListSelectionAttributeComponent,
	[FormFieldType.CodeListLexicon]: CodeListLexiconAttributeComponent,
	[FormFieldType.Radio]: RadioAttributeComponent,
	[FormFieldType.Checkbox]: CheckBoxAttributeComponent,
	[FormFieldType.DatePicker]: DatePickerAttributeComponent,
	[FormFieldType.TimePicker]: ReportTimePickerAttribute,
	[FormFieldType.ReportDiagram]: DiagramAttributeComponent,
	[FormFieldType.SRText]: SRTextAttributeComponent,
	[FormFieldType.Composite]: CompositeAttributeComponent,
	[FormFieldType.Array]: ArrayAttributeComponent,
};
