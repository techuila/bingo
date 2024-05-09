import { useState } from 'react';
import { headers } from '../../../constants/headers';
import supabase from '../../../utils/supabase';

export function useCreateRoom() {
	const [isLoading, setIsLoading] = useState(false);

	const createRoom = async () => {
		let data = null,
			error = null;
		try {
			setIsLoading(true);
			const {
				data: { data: room },
				error
			} = await supabase.functions.invoke('room', {
				headers,
				method: 'POST'
			});
			if (error) throw error;

			localStorage.setItem('roomId', room.room_id);
			localStorage.setItem('creatorId', room.creator_id);
			data = room;
		} catch (err) {
			console.error(err);
			error = err;
		} finally {
			setIsLoading(false);
		}

		return { data, error };
	};

	return { createRoom, isLoading };
}
