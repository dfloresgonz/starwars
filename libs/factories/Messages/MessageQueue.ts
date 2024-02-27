export type MessageQueueRequest = {
    messageBody: Object | string;
    queueUrl: string;
    messageDeduplicationId?: string;
    messageGroupId?: string;
};

export interface IMessageQueue {
    send(request: MessageQueueRequest): Promise<boolean>;
}
