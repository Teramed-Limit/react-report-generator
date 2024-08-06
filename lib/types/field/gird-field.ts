import { ColDef } from 'ag-grid-community';

import { Field } from './field';

export interface GirdField extends Field {
	colDefs: ColDef[];
	gridFontSize: number;
	gridFontName: string;
	gridFontColor: string;
	gridFontWeight: string;
}
