import { FormFieldType } from '../../../field/field-type';
import { ArrayAttributeClass } from './Field/ArrayAttribute/ArrayAttributeClass.ts';
import { CheckBoxAttributeClass } from './Field/CheckBoxAttribute/CheckBoxAttributeClass.ts';
import { CodeListLexiconAttributeClass } from './Field/CodeListLexiconAttribute/CodeListLexiconAttributeClass.ts';
import { CodeListSelectionAttributeClass } from './Field/CodeListSelectionAttribute/CodeListSelectionAttributeClass.ts';
import { CompositeAttributeClass } from './Field/CompositeAttribute/CompositeAttributeClass.ts';
import { CurveChartAttributeClass } from './Field/CurveChartAttribute/CurveChartAttributeClass.ts';
import { DatePickerAttributeClass } from './Field/DatePickerAttribute/DatePickerAttributeClass.ts';
import { DiagramAttributeClass } from './Field/DiagramAttribute/DiagramAttributeClass.ts';
import { GridTableAttributeClass } from './Field/GridTableAttribute/GridTableAttributeClass.ts';
import { NumberAttributeClass } from './Field/NumberAttribute/NumberAttributeClass.ts';
import { RadioAttributeClass } from './Field/RadioAttribute/RadioAttributeClass.ts';
import { SRTextAttributeClass } from './Field/SRTextAttribute/SRTextAttributeClass.ts';
import { TextAreaAttributeClass } from './Field/TextAreaAttribute/TextAreaAttributeClass.ts';
import { TextAttributeClass } from './Field/TextAttribute/TextAttributeClass.ts';
import { TimePickerAttributeClass } from './Field/TimePickerAttribute/TimePickerAttributeClass.ts';

export const FieldAttributeClassMapper = {
	[FormFieldType.Text]: (field) => new TextAttributeClass(field),
	[FormFieldType.TextArea]: (field) => new TextAreaAttributeClass(field),
	[FormFieldType.CodeListSelection]: (field) => new CodeListSelectionAttributeClass(field),
	[FormFieldType.CodeListLexicon]: (field) => new CodeListLexiconAttributeClass(field),
	[FormFieldType.Radio]: (field) => new RadioAttributeClass(field),
	[FormFieldType.Number]: (field) => new NumberAttributeClass(field),
	[FormFieldType.Checkbox]: (field) => new CheckBoxAttributeClass(field),
	[FormFieldType.ReportDiagram]: (field) => new DiagramAttributeClass(field),
	[FormFieldType.DatePicker]: (field) => new DatePickerAttributeClass(field),
	[FormFieldType.TimePicker]: (field) => new TimePickerAttributeClass(field),
	[FormFieldType.Array]: (field) => new ArrayAttributeClass(field),
	[FormFieldType.Composite]: (field) => new CompositeAttributeClass(field),
	[FormFieldType.SRText]: (field) => new SRTextAttributeClass(field),
	[FormFieldType.OBGYNChart]: (field) => new CurveChartAttributeClass(field),
	[FormFieldType.GridTable]: (field) => new GridTableAttributeClass(field),
};
