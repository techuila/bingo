import { useState } from 'react';

export function useCopyToClipboard(text: string = '') {
	const [value, setValue] = useState(text);
	const [copied, setCopied] = useState(false);

	const onCopy = () => {
		setCopied(true);
	};

	const onValueChange = (text: string) => {
		setValue(text);
		setCopied(false);
	};

	return {
		value,
		copied,
		onCopy,
		onValueChange
	};
}
