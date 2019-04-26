import * as React from 'react'
import * as ReactDOM from 'react-dom'
import browser from '../lib/browser'
import Options from './Options'

browser.tabs.query({ active: true, currentWindow: true }, tab => {
    ReactDOM.render(<Options />, document.getElementById('options'))
})
