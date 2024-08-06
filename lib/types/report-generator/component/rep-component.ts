export interface RepComponent {
	uuid: string;
	x: number;
	y: number;
	componentType: ReportComponentType | string;

	[other: string]: any;
}

export enum ReportComponentType {
	General = 'General',
	Label = 'Label',
	DynamicLabel = 'DynamicLabel',
	Image = 'Image',
	DynamicImage = 'DynamicImage',
	Line = 'Line',
	PageNumber = 'PageNumber',
}
