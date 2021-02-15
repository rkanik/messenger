import { AuthState, MessagesState, User } from "./types";

export const authState: AuthState = {
	user: {
		id: '',
		name: '',
		email: '',
		thumbnail: '',
		friends: []
	} as User,
	isAuth: false
}

export const messagesState: MessagesState = {
	messages: []
}
