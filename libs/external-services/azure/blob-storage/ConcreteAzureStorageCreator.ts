import { AzureBlobStorage } from './AzureBlobStorage';
import { Storage } from '../../../factories/Storage/Storage';
import { StorageCreator } from '../../../factories/Storage/StorageCreator';

export class ConcreteAzureStorageCreator extends StorageCreator {
    public factoryMethod(): Storage {
        return new AzureBlobStorage();
    }
}
