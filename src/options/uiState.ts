import { Reducer } from "react";

export const initialState = {
    loading: false,
    message: ""
}

const reducer: Reducer<State, ActionsTypes> = (state: State = initialState, action: ActionsTypes): State => {
    switch(action.type) {
        case Actions.SET_MESSAGE:
            return {...state, message: action.payload}
        case Actions.TOGGLE_LOADING:
            return {...state, loading: action.payload}
        default:
            return state;
    }
};

export default reducer;

export const toggleLoading = (loading?: boolean): ToggleLoadingAction => ({
    type: Actions.TOGGLE_LOADING,
    payload: loading
})

export const setMessage = (message?: string): SetMessageAction => ({
    type: Actions.SET_MESSAGE,
    payload: message
})

enum Actions {
    TOGGLE_LOADING = "TOGGLE_LOADING",
    SET_MESSAGE = "SET_MESSAGE"
}

interface State {
    loading: boolean
    message: string
}

interface ToggleLoadingAction {
    type: typeof Actions.TOGGLE_LOADING
    payload: boolean
}

interface SetMessageAction {
    type: typeof Actions.SET_MESSAGE
    payload: string
}

type ActionsTypes = ToggleLoadingAction | SetMessageAction