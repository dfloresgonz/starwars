import { IMessageQueue, MessageQueueRequest } from './MessageQueue';

export abstract class MessageQueueCreator {
    public abstract factoryMethod(): IMessageQueue;

    public async send(request: MessageQueueRequest): Promise<string> {
        const messageQueue = this.factoryMethod();

        const response = await messageQueue.send(request);

        return `Message sent: ${response}`;
    }
}
