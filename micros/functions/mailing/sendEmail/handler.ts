import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';

import { fetchPeopleSWAPI } from './model';
import { PeopleSwapi } from './types';
import { database } from '../../../../libs/helpers/database';
import { handleError } from '../../../../libs/helpers/errors';
import { log } from '../../../../libs/helpers/log';

let response: APIGatewayProxyResult = {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    body: '',
};

export const method = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        log('works...', 'ok.');
        log('event', event);

        const people: PeopleSwapi[] = await fetchPeopleSWAPI();

        const resp = {
            message: 'works new...',
            size: people.length,
        };

        log('response', resp);

        response.body = JSON.stringify(resp);
    } catch (err: any) {
        response = { ...handleError(err) };
    } finally {
        await database.endPool();
    }
    return response;
};
