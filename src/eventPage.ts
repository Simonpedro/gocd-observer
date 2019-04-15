import { GoCDEvent, GoCDEventType } from "./events";
import configService from "./services/ConfigService";
import slackService from "./services/SlackService";

chrome.runtime.onInstalled.addListener(function() {
    const goCDBaseUrl = configService.getGoCDServerName();

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {hostEquals: goCDBaseUrl}
                    })
                ],
                actions: [
                    new chrome.declarativeContent.ShowPageAction()
                ]
            }
        ]);
    });

});

const eventHandler = (event: GoCDEvent) => {
    switch(event.type) {
        case GoCDEventType.StageBarChanged:
            const data = event.data;
            slackService.chatPostMessage({
                text: `${data.name} -> ${data.state}`
            })
            break;
    }
}

chrome.runtime.onMessage.addListener((event) => {
    console.log('Event: ', event)
    eventHandler(event)    
});

window["global"] = {
    configService,
    slackService
}