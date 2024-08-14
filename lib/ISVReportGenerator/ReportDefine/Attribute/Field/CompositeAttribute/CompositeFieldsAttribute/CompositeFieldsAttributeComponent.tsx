import React from 'react';

import { Button } from '@mui/material';

import { FieldAttributeComponentProps } from '../../../FieldAttributeComponentProps.tsx';
import { CompositeAttributeComponentMapper } from '../CompositeAttributeComponentMapper.tsx';
import { CompositeInnerFieldAttributeClass } from '../CompositeInnerFieldAttribute/CompositeInnerFieldAttributeClass.ts';
import ReportBaseInnerCompositeFieldAttribute from '../CompositeInnerFieldAttribute/CompositeInnerFieldAttributeComponent.tsx';

interface AdditionProps {
	addField: () => void;
	deleteField: (index: number) => void;
}

type Props = AdditionProps & FieldAttributeComponentProps<CompositeInnerFieldAttributeClass[]>;

function CompositeFieldsAttributeComponent({ attrPath, attribute, onSetAttribute, deleteField, addField }: Props) {
	return (
		<>
			{attribute?.map((field, index) => {
				const ComponentToRender = CompositeAttributeComponentMapper[field.type];
				if (!ComponentToRender) {
					console.error(`No attribute component for ${field.type}`);
					return null;
				}
				return (
					<React.Fragment key={field.id}>
						<ReportBaseInnerCompositeFieldAttribute
							attrPath={[...attrPath, index]}
							attribute={new CompositeInnerFieldAttributeClass(field)}
							onSetAttribute={(
								attributePath: (number | string)[],
								attributeValue: number | string | boolean,
							) => {
								onSetAttribute(['fields', index, ...attributePath], attributeValue);
							}}
						/>
						<ComponentToRender
							attrPath={[...attrPath, index]}
							attribute={field}
							onSetAttribute={(
								attributePath: (number | string)[],
								attributeValue: number | string | boolean,
							) => {
								onSetAttribute(['fields', index, ...attributePath], attributeValue);
							}}
						/>
						<Button variant="contained" color="error" fullWidth onClick={() => deleteField(index)}>
							Delete Field
						</Button>
					</React.Fragment>
				);
			})}
			<Button
				sx={{ position: 'sticky', bottom: '0', 'z-index': 1000 }}
				variant="contained"
				fullWidth
				color="primary"
				onClick={() => addField()}
			>
				Add Field
			</Button>
		</>
	);
}

export default React.memo(CompositeFieldsAttributeComponent);
