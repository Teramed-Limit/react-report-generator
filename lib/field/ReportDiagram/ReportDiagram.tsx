import AutorenewIcon from '@mui/icons-material/Autorenew';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import { IconButton, Stack } from '@mui/material';
import cx from 'classnames';

import { ImagePainter } from '../../components/ImagePainter/ImagePainter.tsx';
import { useModal } from '../../hooks/useModal.ts';
import CustomModal from '../../modals/CustomModal/CustomModal.tsx';
import { DiagramField } from '../../types/field/diagram-field.ts';

import classes from './ReportDiagram.module.scss';

interface Props {
	id: string;
	field: DiagramField;
	value: string;
	onGetFieldValue?: (path: (string | number)[]) => any;
	onValueChange: (value: any) => void;
	onFieldValueChange?: (path: (string | number)[], value: any) => void;
}

// 判斷value是base64還是url http開頭，幫我用regex判斷，如果是base64還要確定前面有沒有data:image/png;base64,這樣的字串
function processImageSource(value: string) {
	const urlPattern = /^https?:\/\/.+$/;

	// 檢查是否為 URL
	if (urlPattern.test(value)) {
		return value;
	}

	// 檢查是否已經包含 `data:image/png;base64,` 前綴
	if (value?.startsWith('data:image')) {
		return value;
	}

	return `data:image/png;base64,${value}`;
}

function ReportDiagram({ id, field, value, onGetFieldValue, onValueChange, onFieldValueChange }: Props) {
	const editId = `Edit${field.id}`;
	const markersId = `${field.id}Markers`;

	const { open, setOpen, onModalClose } = useModal({});

	const onResetDiagram = () => {
		onFieldValueChange?.([editId], undefined);
		onFieldValueChange?.([markersId], []);
	};

	const imageUrl = (onGetFieldValue?.([editId]) || processImageSource(value)) ?? '';

	return (
		<>
			<div style={{ height: field.height }} className={cx(classes.imageContainer)}>
				<img id={id} src={imageUrl} alt="None" />
				{!field.hideToolbar && (
					<Stack className={classes.topRight} spacing={0.5}>
						<IconButton size="small" onClick={() => setOpen(true)}>
							<FormatPaintIcon color="primary" />
						</IconButton>
						<IconButton size="small" onClick={() => onResetDiagram()}>
							<AutorenewIcon color="warning" />
						</IconButton>
					</Stack>
				)}
			</div>
			<CustomModal width="90%" height="90%" label="" open={open} onModalClose={() => onModalClose()}>
				<ImagePainter
					imageSrc={processImageSource(value)}
					initMarkers={onGetFieldValue?.([markersId]) ?? []}
					onCancel={() => onModalClose()}
					onExportCanvas={(canvasMarkers, base64) => {
						onFieldValueChange?.([editId], base64);
						onFieldValueChange?.([markersId], canvasMarkers);
						setOpen(false);
					}}
				/>
			</CustomModal>
		</>
	);
}

export default ReportDiagram;
