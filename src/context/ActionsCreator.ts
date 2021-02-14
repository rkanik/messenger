import { authState } from "./states"
import { Dispatch } from "react"
import { Action } from "./types"
import { _resetState, _setState } from "../consts"

const createActions = (dispatch: Dispatch<Action>) => {

	const setState = (payload: any) =>
		dispatch({ type: _setState, payload })

	const resetState = () =>
		dispatch({ type: _resetState, payload: authState })

	return { setState, resetState }
}

export { createActions }