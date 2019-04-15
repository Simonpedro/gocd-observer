import * as React from 'react';
import View from './View';
import uiReducer,  { setMessage, toggleLoading, initialState as uiInitialState } from './uiState'
import { ExtensionOptions } from '../types';
import configService from '../services/ConfigService';


const Options = () => {

    const [uiState, dispatch] = React.useReducer(uiReducer, uiInitialState);
    const [options, setOptions] = React.useState<ExtensionOptions>({
        slackApiKey: "",
        slackChannel: ""
    })

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