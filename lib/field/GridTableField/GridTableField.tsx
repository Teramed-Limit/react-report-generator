import React from 'react';

// import AddBoxIcon from '@mui/icons-material/AddBox';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { IconButton, Stack } from '@mui/material';
// import Box from '@mui/material/Box';
// import { CellStyle, ColDef, Column } from 'ag-grid-community';
// import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { GirdField } from '../../types/field/gird-field.ts';
// import { generateUUID, isEmptyOrNil } from '../../utils/general.ts'; // Optional Theme applied to the Data Grid
// import classes from './GridTableField.module.scss';
// import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the Data Grid
// import 'ag-grid-community/styles/ag-theme-quartz.css';
// // import 'ag-grid-community/styles/ag-theme-alpine.css';
// import './ag-theme-report-grid.scss';

// "ag-grid-community": "^31.0.3",
// "ag-grid-react": "^31.0.3",

interface GridProps {
	field: GirdField;
	value: { uuid: string; [key: string]: any }[];
	onValueChange: (value: any[]) => void;
	disabled: boolean;
}

// function CustomHeader({ column, headerStyle }: { column: Column; headerStyle: CellStyle }) {
// 	return <div style={headerStyle}>{column.getColDef().headerName}</div>;
// }

function GridTableField({ field, value, onValueChange, disabled }: GridProps) {
	return <></>;
	// let uuidRowData = value;
	// if (value && value.length > 0 && Array.isArray(value))
	// 	uuidRowData = uuidRowData.map((row) => ({ ...row, uuid: row.uuid ?? generateUUID() })) || [];
	// else uuidRowData = [];
	//
	// const gridRef = useRef<AgGridReact>(null);
	//
	// const defaultColDef = useMemo<ColDef>(() => {
	// 	return {
	// 		resizable: true,
	// 		editable: true,
	// 		flex: 1,
	// 		headerComponent: CustomHeader,
	// 		headerComponentParams: {
	// 			headerStyle: {
	// 				fontSize: `${field.gridFontSize}pt`,
	// 				fontFamily: field.gridFontName,
	// 				fontWeight: field.gridFontWeight,
	// 				color: field.gridFontColor,
	// 			},
	// 		},
	// 		cellStyle: {
	// 			fontSize: `${field.gridFontSize}pt`,
	// 			fontFamily: field.gridFontName,
	// 			fontWeight: field.gridFontWeight,
	// 			color: field.gridFontColor,
	// 			display: 'flex',
	// 			alignItems: 'flex-start',
	// 			justifyContent: 'flex-start',
	// 			lineHeight: 'normal',
	// 			wordBreak: 'keep-all',
	// 		},
	// 	};
	// }, [field.gridFontColor, field.gridFontName, field.gridFontSize, field.gridFontWeight]);
	//
	// const addItems = useCallback(() => {
	// 	const newItems = [{ uuid: generateUUID() }];
	// 	gridRef.current!.api.applyTransaction({ add: newItems });
	// 	onValueChange(getNowRowData());
	// }, [onValueChange]);
	//
	// const onRemoveSelected = useCallback(() => {
	// 	const selectedData = gridRef.current!.api.getSelectedRows();
	// 	gridRef.current.api.applyTransaction({
	// 		remove: selectedData,
	// 	});
	// 	onValueChange(getNowRowData());
	// }, [onValueChange]);
	//
	// const getNowRowData = () => {
	// 	const updateRowData: any[] = [];
	// 	gridRef.current.api.forEachNode((node) => {
	// 		if (isEmptyOrNil(node.data)) return;
	// 		updateRowData.push(node.data);
	// 	});
	//
	// 	return updateRowData;
	// };
	//
	// return (
	// 	<Box sx={{ width: '100%', height: '100%' }}>
	// 		<Stack sx={{ mb: '2px' }} direction="row">
	// 			<IconButton color="primary" onClick={addItems}>
	// 				<AddBoxIcon fontSize="inherit" />
	// 			</IconButton>
	// 			<IconButton color="error" onClick={onRemoveSelected}>
	// 				<DeleteIcon fontSize="inherit" />
	// 			</IconButton>
	// 		</Stack>
	// 		<Box className={`ag-theme-quartz ag-theme-custom ${classes.gridContainer}`}>
	// 			<AgGridReact
	// 				ref={gridRef}
	// 				getRowId={(params) => params.data.uuid}
	// 				domLayout="autoHeight"
	// 				rowData={uuidRowData || []}
	// 				columnDefs={field.colDefs || []}
	// 				defaultColDef={defaultColDef}
	// 				rowSelection="multiple"
	// 				onCellEditingStopped={(params) => {
	// 					onValueChange(getNowRowData());
	// 				}}
	// 			/>
	// 		</Box>
	// 	</Box>
	// );
}

export default GridTableField;
