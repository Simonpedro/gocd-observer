import {
    GoCDEvent,
    GoCDEventType,
    jobChanges$,
    stageBarChanges$,
} from './events'
import configService from './services/ConfigService'
import slackService from './services/SlackService'

// This piece of code enables the popup on goCD valid pages
chrome.runtime.onInstalled.addListener(() => {
    const goCDBaseUrl = configService.getGoCDServerName()
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { hostEquals: goCDBaseUrl },
                    }),
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()],
            },
        ])
    })
})

// Reacting to stage bar changes
stageBarChanges$.subscribe(event => {
    const stageBar = event.data
    slackService.chatPostMessage({
        text: `Stage change: ${stageBar.name} -> ${stageBar.state}`,
    })
})

// Reacting to job changes
jobChanges$.subscribe(event => {
    const job = event.data
    slackService.chatPostMessage({
        text: `Job change: ${job.name} -> ${job.state}`,
    })
})

// Just for testing
// tslint:disable-next-line: no-string-literal
window['global'] = {
    configService,
    slackService,
}
