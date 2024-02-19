import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';

import { Rpta } from './types';
import { sumar } from '../../../libs/Calculo';
import { log } from '../../../libs/helpers/log';

const response: APIGatewayProxyResult = {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    body: '',
};

export const method = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const suma: number = sumar(14, 28);

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
