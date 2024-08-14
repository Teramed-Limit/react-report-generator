import React from 'react';

import AttributeList from '../../../../../../attribute/AttributeList/AttributeList.tsx';
import ColorPickerButton from '../../../../../../UI/ColorPickerButton/ColorPickerButton.tsx';
import FontNameSelection from '../../FontNameSelection/FontNameSelection';
import FontStyleSelection from '../../FontStyleSelection/FontStyleSelection';
import FontWeightSelection from '../../FontWeightSelection/FontWeightSelection';
import TextAlignSelection from '../../TextAlignSelection/TextAlignSelection';
import TextDecorationSelection from '../../TextDecorationSelection/TextDecorationSelection';
import { CSSStyle } from './CSSStyle.ts';

interface Props {
	attribute: any;
	attrPath?: (string | number)[];
	setAttribute: (attrName: (string | number)[], attrValue: any) => void;
}

function ReportCSSStyleAttribute({ attrPath = [], attribute, setAttribute }: Props) {
	return (
		<AttributeList
			attribute={new CSSStyle(attribute)}
			attrPath={attrPath}
			setAttribute={setAttribute}
			attributeComponentMapper={{
				color: ColorPickerButton,
				backgroundColor: ColorPickerButton,
				borderColor: ColorPickerButton,
				// borderStyle: BorderStyleSelection,
				fontFamily: FontNameSelection,
				fontStyle: FontStyleSelection,
				fontWeight: FontWeightSelection,
				textAlign: TextAlignSelection,
				textDecoration: TextDecorationSelection,
			}}
		/>
	);
}

export default ReportCSSStyleAttribute;
