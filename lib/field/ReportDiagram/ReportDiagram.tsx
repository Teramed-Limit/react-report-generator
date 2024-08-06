import React, { useEffect } from 'react';

import AutorenewIcon from '@mui/icons-material/Autorenew';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import { IconButton, Stack } from '@mui/material';
import cx from 'classnames';

import { useModal } from '../../hooks/useModal.ts';
import CustomModal from '../../modals/CustomModal/CustomModal.tsx';
import ImageCanvasModal from '../../modals/ImageCanvasModal/ImageCanvasModal.tsx';
import { DiagramField } from '../../types/field/diagram-field.ts';
import { isEmptyOrNil } from '../../utils/general.ts';
import classes from './ReportDiagram.module.scss';

interface Props {
	id: string;
	field: DiagramField;
	value: string;
	onGetFieldValue?: (id: string) => any;
	onValueChange: (value: any) => void;
	onFieldValueChange?: (id: string, value: any) => void;
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

function ReportDiagram({ id, field, value, onGetFieldValue, onValueChange, onFieldValueChange }: Props, _) {
	const imageUrl = processImageSource(value ?? field?.defaultValue);
	const { open, setOpen, onModalClose } = useModal({});

	const onResetDiagram = () => {
		onValueChange(field?.defaultValue);
		onFieldValueChange?.(`${field.id}Markers`, []);
	};

	useEffect(() => {
		if (isEmptyOrNil(value) && !isEmptyOrNil(field.defaultValue)) {
			onValueChange(field.defaultValue);
			onFieldValueChange?.(`${field.id}Markers`, []);
		}
	}, [field.defaultValue, field.id, onFieldValueChange, onValueChange, value]);

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
				<ImageCanvasModal
					imageSrc={field?.defaultValue ?? ''}
					initMarkers={onGetFieldValue?.(`${field.id}Markers`) ?? []}
					onExportCanvas={(canvasMarkers, base64) => {
						onValueChange(base64);
						onFieldValueChange?.(`${field.id}Markers`, canvasMarkers);
						setOpen(false);
					}}
				/>
			</CustomModal>
		</>
	);
}

export default ReportDiagram;
