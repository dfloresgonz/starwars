import { StorageCreator } from './StorageCreator';
import { ConcreteAWSStorageCreator } from '../../external-services/aws/s3/ConcreteAWSStorageCreator';
import { ConcreteAzureStorageCreator } from '../../external-services/azure/blob-storage/ConcreteAzureStorageCreator';

export const StorageBuilder = (provider: string): StorageCreator => {
    let storage: StorageCreator;
    if (provider === 'aws') {
        storage = new ConcreteAWSStorageCreator();
    } else if (provider === 'azure') {
        storage = new ConcreteAzureStorageCreator();
    } else {
        throw new Error('Default not implemented yet');
    }
    return storage;
};
