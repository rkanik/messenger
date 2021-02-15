import { useReducer, createContext, useEffect } from 'react'
import Messages from '../pages/Messages'
import { createActions } from "./ActionsCreator"
import { MessagesReducer } from './reducers/MessagesReducer'
import { messagesState } from './states'
import { MessagesContextType } from './types'
import { History } from 'history';

const MessagesContext = createContext<MessagesContextType>({
	...messagesState,
	setState: () => null,
	pushTo: () => null,
	updateTo: () => null,
	deleteFrom: () => null,
	resetState: () => null,
})

type Props = { history: History }
const MessagesProvider: React.FC<Props> = ({ history }) => {

	const [state, dispatch] = useReducer(MessagesReducer, messagesState)

	let {
		setState, resetState,
		pushTo, updateTo, deleteFrom,
	} = createActions(dispatch)

	useEffect(() => {
		console.log('MessagesState', state)
	}, [state])

	return (
		<MessagesContext.Provider value={{
			...state,
			setState, resetState,
			pushTo, updateTo, deleteFrom,
		}}>
			<Messages history={history} />
		</MessagesContext.Provider>
	)
}

export { MessagesProvider, MessagesContext }