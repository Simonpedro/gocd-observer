import * as React from 'react'
import * as ReactDOM from 'react-dom'
import browser from '../lib/browser'
import Popup from './Popup'

browser.tabs.query({ active: true, currentWindow: true }, tab => {
    ReactDOM.render(<Popup />, document.getElementById('popup'))
})
