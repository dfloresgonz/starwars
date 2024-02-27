import { Storage } from '../../../factories/Storage/Storage';

export class AwsS3Storage implements Storage {
    getFile(key: string): string {
        return `File: ${key}`;
    }

    deleteFile(key: string): string {
        return `File ${key} deleted`;
    }

    public uploadFile(data: string): string {
        return `url: ${data} https://aws.s3.com/1234567890/1234567890.jpg`;
    }
}
