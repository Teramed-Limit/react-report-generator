import ReactPDF from '@react-pdf/renderer';

import { RepImageComponent } from '../../../types/report-generator/component/rep-image-component.ts';
import { emptyBaseImage } from '../../../utils/general.ts';

interface Props {
	comp: RepImageComponent;
}

function PDFImageComponent({ comp }: Props) {
	return (
		<ReactPDF.Image
			style={{
				position: 'absolute',
				objectFit: 'contain',
				width: comp.width,
				height: comp.height,
				left: comp.x,
				top: comp.y,
			}}
			src={comp.src || emptyBaseImage()}
		/>
	);
}

export default PDFImageComponent;
