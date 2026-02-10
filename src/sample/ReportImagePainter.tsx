import { Box, Button, Stack } from '@mui/material';
import { useState } from 'react';

import { ImageCanvas, ImagePainter, PositionMarker } from '../../lib/main.ts';
import CustomModal from '../../lib/modals/CustomModal/CustomModal.tsx';

const TEST_IMAGE_SRC =
	'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/800px-Camponotus_flavomarginatus_ant.jpg';

const draggableItems = [
	{ id: 'item-A', label: 'Image A' },
	{ id: 'item-B', label: 'Image B' },
	{ id: 'item-C', label: 'Image C' },
];
export default function ReportImagePainter() {
	// ImagePainter test state
	const [painterOpen, setPainterOpen] = useState(false);
	const [positionMarkers, setPositionMarkers] = useState<PositionMarker<string>[]>([]);

	// ImageCanvas test state
	const [canvasMarkers, setCanvasMarkers] = useState<PositionMarker<string>[]>([]);

	const handleCanvasMarkerPlace = (marker: PositionMarker<string>) => {
		setCanvasMarkers((prev) => {
			const idx = prev.findIndex((m) => m.mappingNumber === marker.mappingNumber);
			if (idx >= 0) {
				const updated = [...prev];
				updated[idx] = { ...updated[idx], pointX: marker.pointX, pointY: marker.pointY };
				return updated;
			}
			return [...prev, marker];
		});
	};

	const handleMarkerPlace = (marker: PositionMarker<string>) => {
		setPositionMarkers((prev) => {
			const idx = prev.findIndex((m) => m.mappingNumber === marker.mappingNumber);
			if (idx >= 0) {
				// Duplicate key: update position only
				const updated = [...prev];
				updated[idx] = { ...updated[idx], pointX: marker.pointX, pointY: marker.pointY };
				return updated;
			}
			return [...prev, marker];
		});
	};

	return (
		<>
			<Stack
				direction="row"
				spacing={2}
				sx={{
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Button variant="contained" color="secondary" onClick={() => setPainterOpen(true)}>
					Open ImagePainter
				</Button>
			</Stack>
			{/* ImageCanvas Test Area (inline, lightweight) */}
			<Box sx={{ mt: 2, mx: 'auto', maxWidth: 900 }}>
				<Box sx={{ mb: 1, fontWeight: 'bold' }}>ImageCanvas Test</Box>
				<Box sx={{ display: 'flex', gap: 1 }}>
					{/* Draggable items for ImageCanvas */}
					<Box sx={{ width: 140, display: 'flex', flexDirection: 'column', gap: 1 }}>
						{draggableItems.map((item, index) => (
							<Box
								key={item.id}
								draggable
								onDragStart={(e) => {
									e.dataTransfer.setData('testKey', item.id);
									e.dataTransfer.setData('mappingNumber', String(index + 1));
								}}
								sx={{
									p: 1,
									border: '1px solid #ccc',
									borderRadius: 1,
									cursor: 'grab',
									textAlign: 'center',
									fontSize: 12,
									'&:hover': { bgcolor: '#e3f2fd' },
								}}
							>
								{item.label}
							</Box>
						))}
						<Box sx={{ mt: 1, fontSize: 11, color: '#888' }}>{`Markers: ${canvasMarkers.length}`}</Box>
						{canvasMarkers.map((pm) => (
							<Box
								key={pm.mappingNumber}
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									fontSize: 11,
									color: '#555',
								}}
							>
								<span>
									#{pm.mappingNumber} ({Math.round(pm.pointX)},{Math.round(pm.pointY)})
								</span>
								<Button
									size="small"
									color="error"
									sx={{ minWidth: 0, p: 0, fontSize: 10 }}
									onClick={() =>
										setCanvasMarkers((prev) =>
											prev.filter((m) => m.mappingNumber !== pm.mappingNumber),
										)
									}
								>
									X
								</Button>
							</Box>
						))}
					</Box>
					{/* ImageCanvas */}
					<Box sx={{ flex: 1, height: 500, border: '1px solid #ddd' }}>
						<ImageCanvas<string>
							imageSrc={TEST_IMAGE_SRC}
							initMarkers={[]}
							dropDataKey="testKey"
							positionMarkers={canvasMarkers}
							onMarkerPlace={handleCanvasMarkerPlace}
						/>
					</Box>
				</Box>
			</Box>

			{/* ImagePainter Test Area */}
			<CustomModal
				width="90%"
				height="90%"
				label="ImagePainter Test"
				open={painterOpen}
				onModalClose={() => setPainterOpen(false)}
			>
				<Box sx={{ display: 'flex', height: '100%', gap: 1 }}>
					{/* Draggable items - simulate external drag source */}
					<Box sx={{ width: 140, display: 'flex', flexDirection: 'column', gap: 1 }}>
						{draggableItems.map((item, index) => (
							<Box
								key={item.id}
								draggable
								onDragStart={(e) => {
									e.dataTransfer.setData('testKey', item.id);
									e.dataTransfer.setData('mappingNumber', String(index + 1));
								}}
								sx={{
									p: 1,
									border: '1px solid #ccc',
									borderRadius: 1,
									cursor: 'grab',
									textAlign: 'center',
									fontSize: 12,
									'&:hover': { bgcolor: '#e3f2fd' },
								}}
							>
								{item.label}
							</Box>
						))}
						<Box sx={{ mt: 1, fontSize: 11, color: '#888' }}>{`Markers: ${positionMarkers.length}`}</Box>
						{positionMarkers.map((pm) => (
							<Box
								key={pm.mappingNumber}
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									fontSize: 11,
									color: '#555',
								}}
							>
								<span>
									#{pm.mappingNumber} ({Math.round(pm.pointX)},{Math.round(pm.pointY)})
								</span>
								<Button
									size="small"
									color="error"
									sx={{ minWidth: 0, p: 0, fontSize: 10 }}
									onClick={() =>
										setPositionMarkers((prev) =>
											prev.filter((m) => m.mappingNumber !== pm.mappingNumber),
										)
									}
								>
									X
								</Button>
							</Box>
						))}
					</Box>
					{/* ImagePainter */}
					<Box sx={{ flex: 1 }}>
						<ImagePainter<string>
							imageSrc={TEST_IMAGE_SRC}
							initMarkers={[]}
							dropDataKey="testKey"
							positionMarkers={positionMarkers}
							onMarkerPlace={handleMarkerPlace}
							onCancel={() => setPainterOpen(false)}
							onExportCanvas={() => {
								setPainterOpen(false);
							}}
						/>
					</Box>
				</Box>
			</CustomModal>
		</>
	);
}
