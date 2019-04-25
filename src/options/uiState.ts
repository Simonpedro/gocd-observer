/**
 * Reducer and initial state for the ui of the options page
 */
import { Reducer } from 'react'

export const initialState = {
    loading: false,
    message: '',
}

const reducer: Reducer<IState, ActionsTypes> = (
    state: IState = initialState,
    action: ActionsTypes
): IState => {
    switch (action.type) {
        case Actions.SET_MESSAGE:
            return { ...state, message: action.payload }
        case Actions.TOGGLE_LOADING:
            return { ...state, loading: action.payload }
        default:
            return state
    }
}

export default reducer

export const toggleLoading = (loading?: boolean): IToggleLoadingAction => ({
    type: Actions.TOGGLE_LOADING,
    payload: loading,
})

export const setMessage = (message?: string): ISetMessageAction => ({
    type: Actions.SET_MESSAGE,
    payload: message,
})

enum Actions {
    TOGGLE_LOADING = 'TOGGLE_LOADING',
    SET_MESSAGE = 'SET_MESSAGE',
}

interface IState {
    loading: boolean
    message: string
}

interface IToggleLoadingAction {
    type: typeof Actions.TOGGLE_LOADING
    payload: boolean
}

interface ISetMessageAction {
    type: typeof Actions.SET_MESSAGE
    payload: string
}

type ActionsTypes = IToggleLoadingAction | ISetMessageAction
