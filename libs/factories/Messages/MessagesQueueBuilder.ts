import { MessageQueueCreator } from './MessageQueueCreator';
import { ConcreteAWSMessageQueueCreator } from '../../external-services/aws/sqs/ConcreteAWSMessageQueueCreator';

export const MessagesQueueBuilder = (provider: string): MessageQueueCreator => {
    let messageQueue: MessageQueueCreator;
    if (provider === 'aws-sqs') {
        messageQueue = new ConcreteAWSMessageQueueCreator();
    } else if (provider === 'azure') {
        throw new Error('Azure not implemented yet');
    } else {
        throw new Error('Default not implemented yet');
    }
    return messageQueue;
};
