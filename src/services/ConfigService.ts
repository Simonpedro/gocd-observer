import { ExtensionOptions } from "../types";

class ConfigService {

    getGoCDServerName(): string {
        return 'ci.jemstep.com'
    }

    setExtensionOptions(options: ExtensionOptions): Promise<ExtensionOptions> {
        return new Promise(resolve => {
            chrome.storage.sync.set(options, () => {
                resolve(options)
            });
        });
    }

    getExtensionOptions(): Promise<ExtensionOptions> {
        return new Promise(resolve => {
            chrome.storage.sync.get(resolve)
        })
    }

}

const configService = new ConfigService();

export default configService;