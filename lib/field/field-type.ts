export enum FormFieldType {
	Text = 'Text',
	TextArea = 'TextArea',
	Number = 'Number',
	CodeListSelection = 'CodeListSelection',
	CodeListLexicon = 'CodeListLexiconInput',
	DatePicker = 'DatePicker',
	TimePicker = 'TimePicker',
	Checkbox = 'Checkbox',
	Radio = 'Radio',
	ReportDiagram = 'ReportDiagram',
	GridTable = 'GridTable',
	Composite = 'Composite',
	Array = 'Array',
	SRText = 'SRText',
	OBGYNChart = 'OBGYNChart',
	// QualityBowelScore = 'QualityBowelScore',
}

export enum LayoutType {
	Page = 'Page',
	Section = 'Section',
	SubSection = 'SubSection',
}

export const noBorderField = {
	[FormFieldType.Radio]: true,
	[FormFieldType.Checkbox]: true,
	// [FormFieldType.QualityBowelScore]: true,
	[FormFieldType.OBGYNChart]: true,
	[FormFieldType.GridTable]: true,
};

export const noHoverField = {
	[FormFieldType.Radio]: true,
	[FormFieldType.Checkbox]: true,
	// [FormFieldType.QualityBowelScore]: true,
	[FormFieldType.OBGYNChart]: true,
	[FormFieldType.GridTable]: true,
};

export const noLabelField = {
	[FormFieldType.ReportDiagram]: true,
};

export const noPaddingField = {
	[FormFieldType.ReportDiagram]: true,
};
