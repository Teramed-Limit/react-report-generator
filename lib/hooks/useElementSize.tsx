import { useCallback, useEffect, useState } from 'react';

// Custom hook to listen for element's width and height changes
export const useElementSize = (ref) => {
	// Initialize state with width and height
	const [size, setSize] = useState({ width: 0, height: 0 });
	const [sizeOfParent, setSizeOfParent] = useState({ width: 0, height: 0 });

	// Update size state based on the element's current size
	const updateSize = useCallback(() => {
		if (ref.current) {
			setSize({
				width: ref.current.offsetWidth - 5,
				height: ref.current.offsetHeight - 5,
			});
			setSizeOfParent({
				width: ref.current.parentElement.offsetWidth - 5,
				height: ref.current.parentElement.offsetHeight - 5,
			});
		}
	}, [ref]);

	// Effect to handle size changes
	useEffect(() => {
		// Make sure the element exists
		if (!ref.current) {
			return;
		}

		// Update size initially
		updateSize();

		// Create a ResizeObserver to watch for size changes
		const observer = new ResizeObserver(updateSize);
		observer.observe(ref.current);

		// Cleanup observer on component unmount
		return () => observer.disconnect();
	}, [ref, updateSize]);

	return { size, sizeOfParent };
};
