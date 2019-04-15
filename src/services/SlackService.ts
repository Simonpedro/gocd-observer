import configService from "./ConfigService";
import axios from "axios"

class SlackService {

    private async getApiKey() {
        const options = await configService.getExtensionOptions();
        return options.slackApiKey;
    }

    private async getChannel() {
        const options = await configService.getExtensionOptions();
        return options.slackChannel;
    }

    async chatPostMessage({ text }: { text: string }) {
        const apiKey = await this.getApiKey()
        const channel = await this.getChannel()
        const formData = new FormData;
        formData.append('token', apiKey);
        formData.append('text', text);
        formData.append('channel', channel);
        return axios.post(`https://slack.com/api/chat.postMessage`, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(e => console.log('SlackService.chatPostMessage:', e));
    }

}

const slackService = new SlackService()
export default slackService;

