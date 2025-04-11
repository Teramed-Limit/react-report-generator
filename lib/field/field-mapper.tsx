import Checkbox from './Checkbox/Checkbox';
import CodeListLexiconInput from './CodeListLexiconInput/CodeListLexiconInput';
import CodeListSelection from './CodeListSelection/CodeListSelection';
import DatePicker from './DatePicker/DatePicker';
import { FormFieldType } from './field-type';
import NumberInput from './NumberInput/NumberInput';
import RadioButton from './RadioButton/RadioButton.tsx';
import ReportDiagram from './ReportDiagram/ReportDiagram';
import ReportDiagramEdit from './ReportDiagram/ReportDiagramEdit/ReportDiagramEdit.tsx';
import SRTextInputEdit from './SRTextInput/SRConfigTextInput/SRTextInputEdit.tsx';
import SRTextInput from './SRTextInput/SRTextInput.tsx';
import TextArea from './TextArea/TextArea';
import TextInput from './TextInput/TextInput';
import TimePicker from './TimePicker/TimePicker.tsx';

export const FieldMapper = {
	[FormFieldType.Text]: TextInput,
	[FormFieldType.TextArea]: TextArea,
	[FormFieldType.CodeListSelection]: CodeListSelection,
	[FormFieldType.CodeListLexicon]: CodeListLexiconInput,
	[FormFieldType.Radio]: RadioButton,
	[FormFieldType.Number]: NumberInput,
	[FormFieldType.Checkbox]: Checkbox,
	[FormFieldType.ReportDiagram]: ReportDiagram,
	[FormFieldType.DatePicker]: DatePicker,
	[FormFieldType.TimePicker]: TimePicker,
	// [FormFieldType.GridTable]: GridTableField,
	[FormFieldType.SRText]: SRTextInput,
};

export const FieldEditMapper = {
	...FieldMapper,
	[FormFieldType.SRText]: SRTextInputEdit,
	[FormFieldType.ReportDiagram]: ReportDiagramEdit,
};
