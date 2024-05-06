import { useEffect, useState } from 'react';

export function useDragHover() {
	const [isMouseDown, setIsMouseDown] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseDown = (event: React.MouseEvent) => {
		event.preventDefault();
		setIsMouseDown(true);
	};

	const handleMouseUp = () => {
		setIsMouseDown(false);
	};

	const handleMouseEnter = () => {
		if (isMouseDown) {
			setIsHovered(true);
		}
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	useEffect(() => {
		document.addEventListener('mouseup', handleMouseUp);

		return () => {
			document.removeEventListener('mouseup', handleMouseUp);
		};
	});

	return {
		isMouseDown,
		isHovered,
		handleMouseEnter,
		handleMouseDown,
		handleMouseLeave
	};
}
