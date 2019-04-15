import * as React from 'react';
import View from './View';
import uiReducer,  { setMessage, toggleLoading, initialState as uiInitialState } from './uiState'
import { ExtensionOptions } from '../types';
import configService from '../services/ConfigService';


const Options = () => {
    // UI state
    const [uiState, dispatch] = React.useReducer(uiReducer, uiInitialState);
    
    // State of the options. 
    const [options, setOptions] = React.useState<ExtensionOptions>({
        slackApiKey: "",
        slackChannel: ""
    })

    // This runs on the first render only, initializing the options coming from the ConfigService
    React.useEffect(() => {
        configService.getExtensionOptions()
            .then(setOptions)
    }, [])

    const {loading, message } = uiState;

    const onOptionsChange = (options: ExtensionOptions) => {
        dispatch(toggleLoading(true));
        configService.setExtensionOptions(options)
            .then((options) => {
                setOptions(options);
                dispatch(toggleLoading(false));
                dispatch(setMessage("Config saved!"))
                setInterval(() => dispatch(setMessage("")), 5000)
            });
    }


    return (
        <View options={options} onOptionsChange={onOptionsChange} loading={loading} message={message}/>
    )
}

export default Options;