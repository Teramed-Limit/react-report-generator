import { StyleSheet, Text, View } from '@react-pdf/renderer';

import { GirdField } from '../../../../types/field/gird-field.ts';
import { isEmptyOrNil } from '../../../../utils/general.ts';

const globalStyle = StyleSheet.create({
	table: {
		display: 'flex',
		flexDirection: 'column',
		borderStyle: 'solid',
		borderWidth: 1.6,
		borderRadius: 4.5,
		borderColor: '#babfc7',
		width: '100%',
	},
	tableRow: {
		flexDirection: 'row',
		borderStyle: 'solid',
		borderColor: '#babfc7',
		borderBottomWidth: 1.6,
		backgroundColor: '#FFFFFF',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
	},
	tableHeaderRow: {
		flexDirection: 'row',
		borderStyle: 'solid',
		borderColor: '#babfc7',
		borderBottomWidth: 1.6,
		backgroundColor: '#F8F8F8',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
	},
	tableCellHeader: {
		flex: 1,
		// fontSize: '10pt',
		padding: '2pt 5pt',
		fontWeight: 700,
	},
	tableCell: {
		flex: 1,
		display: 'flex',
		// fontSize: '10pt',
		padding: '2pt 5pt',
		fontWeight: 700,
	},
});

interface Props {
	field: GirdField;
	value: any[];
}

function PDFGridTable({ field, value }: Props) {
	if (isEmptyOrNil(value)) return null;
	if (!Array.isArray(value)) return null;
	if (value.length === 0) return null;

	return (
		<View style={globalStyle.table}>
			<View style={globalStyle.tableHeaderRow}>
				{field.colDefs.map((col) => {
					return (
						<Text
							key={col.field}
							style={[
								globalStyle.tableCellHeader,
								{
									flex: col.flex,
									fontSize: `${field.gridFontSize}pt`,
									maxWidth: col.maxWidth ? col.maxWidth * 0.75 : 'auto',
								},
							]}
						>
							{col.headerName}
						</Text>
					);
				})}
			</View>
			{value?.map((item, index) => {
				const isLastItem = index === value.length - 1;
				const isOdd = index % 2 === 0;
				return (
					<View
						key={item.uuid}
						style={{
							...globalStyle.tableRow,
							borderBottomWidth: isLastItem ? 0 : 1.6,
							backgroundColor: isOdd ? '#FFFFFF' : '#FCFCFC',
						}}
					>
						{field.colDefs.map((col) => {
							if (!col.field) return null;
							const colValue = item[col.field] || '';
							return (
								<Text
									key={col.field}
									style={[
										globalStyle.tableCell,
										{
											flex: col.flex,
											fontSize: `${field.gridFontSize}pt`,
											maxWidth: col.maxWidth ? col.maxWidth * 0.75 : 'auto',
										},
									]}
								>
									{colValue}
								</Text>
							);
						})}
					</View>
				);
			})}
		</View>
	);
}

export default PDFGridTable;
