import { jobChanges$, stageBarChanges$ } from './events'
import browser from './lib/browser'
import configService from './services/ConfigService'

const createNotification = ({
    title = 'GoCD Observer',
    message,
}: {
    title: string
    message: string
}) => {
    browser.notifications.create({
        title,
        message,
        type: 'basic',
        iconUrl: browser.extension.getURL('icon48.png'),
    })
}

// Reacting to stage bar changes
stageBarChanges$.subscribe(event => {
    const stageBar = event.data
    createNotification({
        title: 'Stage bar change',
        message: `${stageBar.name} -> ${stageBar.state}`,
    })
})

// Reacting to job changes
jobChanges$.subscribe(event => {
    const job = event.data
    createNotification({
        title: 'Job change',
        message: `${job.name} -> ${job.state}`,
    })
})

// Just for testing
// tslint:disable-next-line: no-string-literal
window['global'] = {
    configService,
    createNotification,
}
