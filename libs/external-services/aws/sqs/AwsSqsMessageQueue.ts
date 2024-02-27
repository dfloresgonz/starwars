import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

import { IMessageQueue, MessageQueueRequest } from '../../../factories/Messages/MessageQueue';

export class AwsSqsMessageQueue implements IMessageQueue {
    public async send(request: MessageQueueRequest): Promise<boolean> {
        const sqsClient = new SQSClient({});

        const { messageBody, queueUrl } = request;

        const input = {
            QueueUrl: queueUrl,
            MessageBody: JSON.stringify(messageBody),
        };

        const command = new SendMessageCommand(input);
        await sqsClient.send(command);

        return true;
    }
}
