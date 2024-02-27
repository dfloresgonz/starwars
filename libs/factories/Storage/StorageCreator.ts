import { Storage } from './Storage';

export abstract class StorageCreator {
    public abstract factoryMethod(): Storage;

    public upload(key: string): string {
        const storage = this.factoryMethod();
        return `Upload complete, url: ${storage.uploadFile(key)}`;
    }

    public get(key: string): string {
        const storage = this.factoryMethod();
        return `Upload complete, url: ${storage.getFile(key)}`;
    }

    public delete(key: string): string {
        const storage = this.factoryMethod();
        return `Upload complete, url: ${storage.deleteFile(key)}`;
    }
}
