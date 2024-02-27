export interface Storage {
    uploadFile(data: string): string;
    getFile(key: string): string;
    deleteFile(key: string): string;
}
