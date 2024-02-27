import { Storage } from '../../../factories/Storage/Storage';

export class AzureBlobStorage implements Storage {
    uploadFile(data: string): string {
        return `file was uploaded, url: https://azure.blob.com/1234567890/1234567890.jpg, ${data}`;
    }

    getFile(key: string): string {
        return `File-azure: ${key}`;
    }

    deleteFile(key: string): string {
        return `File-azure ${key} deleted`;
    }
}
