import { QUEUE_TEST } from './libs/environment/constants';
import { MessageQueueRequest } from './libs/factories/Messages/MessageQueue';
import { MessagesQueueBuilder } from './libs/factories/Messages/MessagesQueueBuilder';
// import { StorageBuilder } from './libs/factories/Storage/StorageBuilder';
import { log } from './libs/helpers/log';

// const storage = StorageBuilder('azure');
// const subir: string = storage.upload('file.txt');

// log('upload', subir);

const testQueue = async () => {
    const messageQueue = MessagesQueueBuilder('aws-sqs');

    const input: MessageQueueRequest = {
        queueUrl: QUEUE_TEST,
        messageBody: {
            Message: 'New....',
            prueba: true,
            caller: 'dummy3',
        },
    };

    const mensaje: string = await messageQueue.send(input);
    log('send', mensaje);
};

testQueue();
