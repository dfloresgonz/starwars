import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';

import { Rpta } from './types';
import { log } from '../../../libs/helpers/log';

const response: APIGatewayProxyResult = {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    body: '',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const method = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const suma: number = 1;

        const rpta: Rpta = {
            suma,
        };

        response.body = JSON.stringify(rpta);
    } catch (err: any) {
        log('error:', err);
        response.statusCode = err.status || 500;
        response.body = JSON.stringify({
            msj: err.msj || 'Hubo un error',
        });
    }
    return response;
};
