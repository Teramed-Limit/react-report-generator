export enum FormFieldType {
	Text = 'Text',
	TextArea = 'TextArea',
	CodeListSelection = 'CodeListSelection',
	CodeListLexicon = 'CodeListLexiconInput',
	AsyncLexicon = 'AsyncLexicon',
	Composite = 'Composite',
	Checkbox = 'Checkbox',
	Radio = 'Radio',
	Number = 'Number',
	QualityBowelScore = 'QualityBowelScore',
	ReportDiagram = 'ReportDiagram',
	DatePicker = 'DatePicker',
	TimePicker = 'TimePicker',
	Array = 'Array',
	SRText = 'SRText',
	OBGYNChart = 'OBGYNChart',
	GridTable = 'GridTable',
}

export enum LayoutType {
	Page = 'Page',
	Section = 'Section',
	SubSection = 'SubSection',
}

export const noBorderField = {
	[FormFieldType.Radio]: true,
	[FormFieldType.Checkbox]: true,
	[FormFieldType.QualityBowelScore]: true,
	[FormFieldType.OBGYNChart]: true,
	[FormFieldType.GridTable]: true,
};

export const noHoverField = {
	[FormFieldType.Radio]: true,
	[FormFieldType.Checkbox]: true,
	[FormFieldType.QualityBowelScore]: true,
	[FormFieldType.OBGYNChart]: true,
	[FormFieldType.GridTable]: true,
};

export const noLabelField = {
	[FormFieldType.ReportDiagram]: true,
};
