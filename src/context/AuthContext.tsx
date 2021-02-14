import { useReducer, createContext, useEffect } from 'react'
import { createActions } from "./ActionsCreator"
import { AuthReducer } from "./reducers/AuthReducer"
import { authState } from './states'
import { AuthContextType } from './types'

const AuthContext = createContext<AuthContextType>({
	...authState,
	setState: () => { },
	resetState: () => { },
})

const AuthProvider: React.FC = ({ children }) => {

	const [state, dispatch] = useReducer(AuthReducer, authState)

	let {
		setState,
		resetState
	} = createActions(dispatch)

	useEffect(() => {
		console.log('AuthState', state)
	}, [state])

	return (
		<AuthContext.Provider value={{
			...state,
			setState,
			resetState
		}}>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthProvider, AuthContext }