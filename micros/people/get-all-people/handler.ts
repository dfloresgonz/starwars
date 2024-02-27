import {
    APIGatewayProxyResult,
    APIGatewayProxyEvent,
    APIGatewayProxyEventQueryStringParameters,
} from 'aws-lambda';

import { getPeoples } from './logic';
import { People, Rpta } from './types';
import { QUEUE_TEST } from '../../../libs/environment/constants';
import { MessageQueueRequest } from '../../../libs/factories/Messages/MessageQueue';
import { MessagesQueueBuilder } from '../../../libs/factories/Messages/MessagesQueueBuilder';
import { database } from '../../../libs/helpers/database';
import { handleError } from '../../../libs/helpers/errors';
import { getColegio } from '../../../libs/helpers/getColegio';
import { log } from '../../../libs/helpers/log';

let response: APIGatewayProxyResult = {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    body: '',
};

export const method = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const query: APIGatewayProxyEventQueryStringParameters = event.queryStringParameters || {};

        const colegio: string = getColegio(event.headers);

        const foo: string = query.foo || '';
        const age: string = query.age || '';

        log('data:', { foo, age });
        log('log...:', 'new');

        const resp: People[] = await getPeoples(colegio);
        const suma = 12;

        const rpta: Rpta = {
            suma,
            datos: resp,
        };

        const messageQueue = MessagesQueueBuilder('aws-sqs');

        const input: MessageQueueRequest = {
            queueUrl: QUEUE_TEST,
            messageBody: {
                Message: 'New....',
                prueba: true,
                caller: 'dummy4',
            },
        };

        const mensaje: string = await messageQueue.send(input);
        log('send', mensaje);

        response.body = JSON.stringify(rpta);
    } catch (err: any) {
        response = { ...handleError(err) };
    } finally {
        await database.endPool();
    }
    return response;
};
