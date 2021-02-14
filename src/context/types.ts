export type AuthState = {
	user: {
		name: string;
		email: string;
		thumbnail: string;
	};
	isAuth: boolean;
}

export type AuthContextType = {
	user: {
		name: string;
		email: string;
		thumbnail: string;
	};
	isAuth: boolean;
	setState: (payload: any) => void;
	resetState: () => void;
}

export interface Action {
	type: string;
	payload: any;
}