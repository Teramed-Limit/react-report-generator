import { useState } from 'react';

export const useModalControl = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return {
		isModalOpen,
		openModal,
		closeModal,
	};
};
