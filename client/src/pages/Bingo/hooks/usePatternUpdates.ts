import { useState } from 'react';
import { Pattern } from '../types/pattern';
import supabase from '../../../utils/supabase';

const initialPatternState = new Array(25).fill(false) as Pattern;
export function usePatternUpdate() {
	const [pattern, _] = useState<Pattern>(initialPatternState);
	const [isLoading, setIsLoading] = useState(false);

	const updatePattern = async (pattern: Pattern) => {
		let data = null,
			error = null;
		try {
			setIsLoading(true);
			const { data: updatedPattern, error } = await supabase
				.from('pattern')
				.upsert({ pattern });
			if (error) throw error;

			data = updatedPattern;
		} catch (err) {
			console.error(err);
			error = err;
		} finally {
			setIsLoading(false);
		}

		return { data, error };
	};

	return { pattern, updatePattern, isLoading };
}
