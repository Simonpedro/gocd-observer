# GoCD Observer - Chrome Extension (built with TypeScript + React)

> This project allows observe and automate GoCD related tasks.

## Building

1.  Clone repo
2.  `npm i`
3.  `npm run dev` to compile once or `npm run watch` to run the dev task in watch mode
4.  `npm run build` to build a production (minified) version

## Installation

1.  Complete the steps to build the project above
2.  Go to [_chrome://extensions_](chrome://extensions) in Google Chrome
3.  With the developer mode checkbox ticked, click **Load unpacked extension...** and select the _dist_ folder from this repo

## Architecture

This extension has four main components:
- `eventPage.ts`: The background script. Initializes extension configuration and reacts to events maybe sending messages through slack.
- `contentScript.ts`: The content script that inspect the dom and triggers events on changes.
- `popup`: Activated on go cd urls.
- `options`: Shows options page

The communication between te different components is through events and abstracted using reactive streams.
