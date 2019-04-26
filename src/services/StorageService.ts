import browser from '../lib/browser'

class StorageService {
    public set(items: object): Promise<void> {
        return new Promise(resolve => {
            browser.storage.sync.set(items, resolve)
        })
    }

    public get(
        keys?: string | string[] | object | null
    ): Promise<{ [key: string]: any }> {
        return new Promise(resolve => {
            browser.storage.sync.get(resolve)
        })
    }
}

const storageService = new StorageService()

export default storageService
