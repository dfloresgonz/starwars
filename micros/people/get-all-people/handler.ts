import {
    APIGatewayProxyResult,
    APIGatewayProxyEvent,
    APIGatewayProxyEventQueryStringParameters,
} from 'aws-lambda';

import { getPeoples } from './logic';
import { People, Rpta } from './types';
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
        const query: APIGatewayProxyEventQueryStringParameters = event.queryStringParameters || {};
        log('query:', query);
        log('foo:', query.foo);

        const foo: string = query.foo || '';
        const age: string = query.age || '';

        log('data:', { foo, age });

        const resp: People[] = await getPeoples();
        const suma = sumar(4, 10);

        const rpta: Rpta = {
            suma,
            datos: resp,
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
