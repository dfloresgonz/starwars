import { AwsS3Storage } from './AwsS3Storage';
import { Storage } from '../../../factories/Storage/Storage';
import { StorageCreator } from '../../../factories/Storage/StorageCreator';

export class ConcreteAWSStorageCreator extends StorageCreator {
    public factoryMethod(): Storage {
        return new AwsS3Storage();
    }
}
