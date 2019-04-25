/**
 * Here'll be declared global types definitions
 */
export interface IStageBarState {
    name: string
    state: string
}

export interface IJob {
    name: string
    state: string
}

export interface IExtensionOptions {
    /**
     * Slack api
     */
    slackApiKey: string
    /**
     * Slack channel id. I could the user slack ID too.
     */
    slackChannel: string
}
