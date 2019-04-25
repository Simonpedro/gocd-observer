import * as React from 'react'
import configService from '../services/ConfigService'
import { IExtensionOptions } from '../types'
import uiReducer, {
    initialState as uiInitialState,
    setMessage,
    toggleLoading,
} from './uiState'
import View from './View'

const Options = () => {
    // UI state
    const [uiState, dispatch] = React.useReducer(uiReducer, uiInitialState)

    // State of the options.
    const [options, setOptions] = React.useState<IExtensionOptions>({
        slackApiKey: '',
        slackChannel: '',
    })

    // This runs on the first render only, initializing the options coming from the ConfigService
    React.useEffect(() => {
        configService.getExtensionOptions().then(setOptions)
    }, [])

    const { loading, message } = uiState

    const onOptionsChange = (newOptions: IExtensionOptions) => {
        dispatch(toggleLoading(true))
        configService.setExtensionOptions(newOptions).then(() => {
            setOptions(newOptions)
            dispatch(toggleLoading(false))
            dispatch(setMessage('Config saved!'))
            setInterval(() => dispatch(setMessage('')), 5000)
        })
    }

    return (
        <View
            options={options}
            onOptionsChange={onOptionsChange}
            loading={loading}
            message={message}
        />
    )
}

export default Options
