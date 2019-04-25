import axios from 'axios'
import logger from '../lib/log'
import ConfigService from './ConfigService'

class SlackService {
    public async chatPostMessage({ text }: { text: string }) {
        const apiKey = await this.getApiKey()
        const channel = await this.getChannel()
        const formData = new FormData()
        formData.append('token', apiKey)
        formData.append('text', text)
        formData.append('channel', channel)
        return axios
            .post(`https://slack.com/api/chat.postMessage`, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .then(e => logger.log('SlackService.chatPostMessage:', e))
    }
    private async getApiKey() {
        const options = await ConfigService.getExtensionOptions()
        return options.slackApiKey
    }

    private async getChannel() {
        const options = await ConfigService.getExtensionOptions()
        return options.slackChannel
    }
}

const slackService = new SlackService()
export default slackService
