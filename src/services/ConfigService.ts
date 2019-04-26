import { defaults } from 'lodash'
import { IExtensionOptions, IStageBarState } from '../types'
import StorageService from './StorageService'

class ConfigService {
    private defaults: IExtensionOptions = {}

    public getGoCDServerName(): string {
        return 'ci.jemstep.com'
    }

    public setExtensionOptions(options: IExtensionOptions): Promise<void> {
        return StorageService.set({
            extensionOptions: options,
        })
    }

    public getExtensionOptions(): Promise<IExtensionOptions> {
        return StorageService.get('extensionOptions').then(items => {
            return defaults(items.extensionOptions, this.defaults)
        })
    }
}

const configService = new ConfigService()

export default configService
