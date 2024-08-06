import React from 'react';

import AttributeList from '../../../../attribute/AttributeList/AttributeList.tsx';
import { RepComponentAttribute } from '../../../../types/report-generator/rep-attribute.ts';
import ColorPickerButton from '../../../../UI/ColorPickerButton/ColorPickerButton.tsx';
import ExpandToggler from '../../../../UI/ExpandToggler/ExpandToggler.tsx';
import FontNameSelection from '../../../ReportDefine/Attribute/Common/FontNameSelection/FontNameSelection';
import FontStyleSelection from '../../../ReportDefine/Attribute/Common/FontStyleSelection/FontStyleSelection';
import FontWeightSelection from '../../../ReportDefine/Attribute/Common/FontWeightSelection/FontWeightSelection';

interface Props {
	compAttribute?: RepComponentAttribute;
	onSetCompAttribute: (uuid: string, attrPath: (number | string)[], attrValue: number | string | boolean) => void;
}

function ReportComponentAttributeList({ compAttribute = undefined, onSetCompAttribute }: Props) {
	const setAttribute = (attrName: (string | number)[], attrValue: any) => {
		if (!compAttribute?.uuid) return;
		onSetCompAttribute(compAttribute.uuid, attrName, attrValue);
	};

	const hasCanvasAttribute =
		compAttribute?.x1 !== undefined &&
		compAttribute?.x2 !== undefined &&
		compAttribute?.y1 !== undefined &&
		compAttribute?.y2 !== undefined &&
		compAttribute?.color !== undefined &&
		compAttribute?.thickness !== undefined;

	const hasOthersAttribute = compAttribute?.showTotalPages !== undefined;

	const hasValueAttribute = compAttribute?.value !== undefined || compAttribute?.src !== undefined;

	const hasFontAttribute =
		compAttribute?.fontColor !== undefined &&
		compAttribute?.fontSize !== undefined &&
		compAttribute?.fontName !== undefined &&
		compAttribute?.fontWeight !== undefined &&
		compAttribute?.fontStyle !== undefined;

	return (
		<>
			{/* Layout */}
			<ExpandToggler title="Layout">
				<AttributeList
					attribute={{
						x: compAttribute?.x,
						y: compAttribute?.y,
						width: compAttribute?.width,
						height: compAttribute?.height,
					}}
					setAttribute={setAttribute}
				/>
			</ExpandToggler>
			{/* Font */}
			{hasFontAttribute && (
				<ExpandToggler title="Font">
					<AttributeList
						attribute={{
							fontColor: compAttribute?.fontColor,
							fontSize: compAttribute?.fontSize,
							fontName: compAttribute?.fontName,
							fontWeight: compAttribute?.fontWeight,
							fontStyle: compAttribute?.fontStyle,
							// prefix: compAttribute?.prefix,
							// suffix: compAttribute?.suffix,
						}}
						setAttribute={setAttribute}
						attributeComponentMapper={{
							fontColor: ColorPickerButton,
							fontName: FontNameSelection,
							fontWeight: FontWeightSelection,
							fontStyle: FontStyleSelection,
						}}
					/>
				</ExpandToggler>
			)}
			{/* Miscellaneous */}
			{hasValueAttribute && (
				<ExpandToggler title="Miscellaneous">
					<AttributeList attribute={{ value: compAttribute?.value }} setAttribute={setAttribute} />
					<AttributeList attribute={{ src: compAttribute?.src }} setAttribute={setAttribute} />
				</ExpandToggler>
			)}
			{/* Others */}
			{hasOthersAttribute && (
				<ExpandToggler title="Others">
					<AttributeList
						attribute={{ showTotalPages: compAttribute?.showTotalPages }}
						setAttribute={setAttribute}
					/>
				</ExpandToggler>
			)}
			{/* Canvas */}
			{hasCanvasAttribute && (
				<ExpandToggler title="Canvas">
					<AttributeList
						attribute={{
							x1: compAttribute?.x1,
							x2: compAttribute?.x2,
							y1: compAttribute?.y1,
							y2: compAttribute?.y2,
							color: compAttribute?.color,
							thickness: compAttribute?.thickness,
						}}
						attributeComponentMapper={{ color: ColorPickerButton }}
						setAttribute={setAttribute}
					/>
				</ExpandToggler>
			)}
		</>
	);
}

export default ReportComponentAttributeList;
