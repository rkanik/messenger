import { messagesState } from "../states"
import { Action, Message, MessagesState, Payload, ActionTypes } from '../types'

export const MessagesReducer = (state: MessagesState, action: Action) => {
	const { type, payload } = action
	switch (type) {
		case ActionTypes._setState:
			return Object
				.keys(payload)
				.reduce((state: MessagesState, key: string) => {
					return {
						...state,
						[key]: payload[key]
					}
				}, state)

		// Push to Messages
		case ActionTypes._pushTo:
			let [property, ...els] = payload as Payload<MessagesState, Message>
			if (!property || !els.length) throw new Error('Invalid Paylod!')
			//state[property].push(...els)
			return {
				...state,
				[property]: [
					...state[property],
					...els
				]
			}

		// Update a message
		case ActionTypes._updateTo:
			let data: any
			[property, data] = payload as Payload<MessagesState, any>
			if (!property || !data) throw new Error('Invalid Paylod!')

			state[property].forEach(el => {
				if (el.id === data.id) {
					el = { ...el, ...data }
				}
			})
			return state

		// Update a message
		case ActionTypes._deleteFrom:
			let msgId: any
			[property, msgId] = payload as Payload<MessagesState, string>
			if (!property || !msgId) throw new Error('Invalid Paylod!')
			state[property] = state[property].filter(
				({ id }) => id !== msgId
			)
			return state

		// Clear the message state
		case ActionTypes._resetState:
			return { ...messagesState }

		default:
			throw new Error('Action Not Found!')
	}
}
