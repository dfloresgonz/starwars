/* eslint-disable @typescript-eslint/no-unused-vars */
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';

import { getStudents } from './service';
import { Student } from './types';
import { database } from '../../../libs/helpers/database';
import { handleError } from '../../../libs/helpers/errors';

let response: APIGatewayProxyResult = {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    body: '',
};

export const method = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const resp: Student[] = await getStudents();

        response.body = JSON.stringify(resp);
    } catch (err: any) {
        response = { ...handleError(err) };
    } finally {
        await database.endPool();
    }
    return response;
};
