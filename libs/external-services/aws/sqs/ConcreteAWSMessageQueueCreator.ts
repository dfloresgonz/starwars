import { AwsSqsMessageQueue } from './AwsSqsMessageQueue';
import { IMessageQueue } from '../../../factories/Messages/MessageQueue';
import { MessageQueueCreator } from '../../../factories/Messages/MessageQueueCreator';

export class ConcreteAWSMessageQueueCreator extends MessageQueueCreator {
    public factoryMethod(): IMessageQueue {
        return new AwsSqsMessageQueue();
    }
}
