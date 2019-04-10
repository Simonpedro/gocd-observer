import * as React from 'react';
import View from './View';

const Popup = () => {
    
    React.useEffect(() => {
        chrome.runtime.sendMessage({ popupMounted: true });
    }, []);

    return (
        <View />
    )
}

export default Popup;