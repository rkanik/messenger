// Enums
export enum MsgType {
	_text = 'text',
	_image = 'image',
	_video = 'video',
	_file = 'video'
}

enum ConvType {
	_group = 'group',
	_direct = 'direct'
}

export enum ActionTypes {
	_setState = 'setState',
	_pushTo = 'pushTo',
	_updateTo = 'updateTo',
	_deleteFrom = 'deleteFrom',
	_resetState = 'resetState'
}

// Schemas
export type User = {
	id: string
	name: string
	email: string
	thumbnail: string
	friends: string[]
}

export type Message = {
	id: string
	type: MsgType
	message: string
	sentAt: string
	sendBy: string
	sendTo: string
	seenBy: string | string[]
	isSeen: boolean
	isDelivered: boolean
	isForwarded?: boolean
	forwardedFrom?: boolean
	messageId?: string
}

export type Conv = {
	id: string
	type: ConvType
	color?: string
	emoji?: string
	group?: {
		name: string
		thumbnail: string
	}
	members?: string[]
}

// State Types
export type AuthState = {
	user: User;
	isAuth: boolean;
}
export type MessagesState = {
	messages: Message[]
}

// Context Types
export type AuthContextType = {
	user: User;
	isAuth: boolean;
	setState: (payload: any) => void;
	resetState: () => void;
}

export type MessagesContextType = {
	messages: Message[];
	setState: (payload: any) => void;
	pushTo: (payload: [string, ...any]) => void;
	updateTo: (payload: [string, any]) => void;
	deleteFrom: (payload: [string, string]) => void;
	resetState: () => void;
}

export type ConvContextType = {
	convs: Conv[];
	setState: (payload: any) => void;
	pushTo: (payload: [string, ...any]) => void;
	updateTo: (payload: [string, any]) => void;
	deleteFrom: (payload: [string, string]) => void;
	resetState: () => void;
}

export type Action = {
	type: ActionTypes;
	payload: any | [string, any];
}

export type Payload<S, V> = [keyof S, V]