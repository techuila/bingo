export type Game = {
	id: string;
	room_id: string;
	pattern: Array<boolean>;
	called_digits: Array<number>;
	created_at: string;
};
