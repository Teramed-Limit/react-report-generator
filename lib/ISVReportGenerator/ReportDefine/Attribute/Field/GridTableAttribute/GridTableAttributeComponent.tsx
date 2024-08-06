import React from 'react';

import AttributeList from '../../../../../attribute/AttributeList/AttributeList.tsx';
import ColorPickerButton from '../../../../../UI/ColorPickerButton/ColorPickerButton.tsx';
import ColDefEditor from '../../Common/ColDefEditor/ColDefEditor';
import FontNameSelection from '../../Common/FontNameSelection/FontNameSelection';
import FontStyleSelection from '../../Common/FontStyleSelection/FontStyleSelection';
import FontWeightSelection from '../../Common/FontWeightSelection/FontWeightSelection';
import { FieldAttributeComponentProps } from '../../FieldAttributeComponentProps.tsx';
import { GridTableAttributeClass } from './GridTableAttributeClass.ts';

function GridTableAttributeComponent({
	attrPath,
	attribute,
	onSetAttribute,
}: FieldAttributeComponentProps<GridTableAttributeClass>) {
	return (
		<>
			<AttributeList
				defaultExpanded={false}
				attribute={new GridTableAttributeClass(attribute)}
				setAttribute={onSetAttribute}
				filterType="include"
				attributeComponentMapper={{
					gridFontColor: ColorPickerButton,
					gridFontName: FontNameSelection,
					gridFontWeight: FontWeightSelection,
					gridFontStyle: FontStyleSelection,
					colDefs: (
						<ColDefEditor
							value={attribute.colDefs}
							onValueChange={(value) => {
								onSetAttribute(['colDefs'], value as any);
							}}
						/>
					),
				}}
				includeAttribute={[
					'colDefs',
					'gridFontSize',
					'gridFontName',
					'gridFontColor',
					'gridFontWeight',
					'gridFontStyle',
				]}
			/>
		</>
	);
}

export default GridTableAttributeComponent;
