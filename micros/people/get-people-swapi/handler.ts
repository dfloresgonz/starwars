import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';

import { getPeopleSWAPI } from './logic';
import { Rpta, PeopleSwapi } from './types';
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
        const resp: PeopleSwapi[] = await getPeopleSWAPI();

        const rpta: Rpta = {
            suma: 2,
            datos: resp,
        };

        response.body = JSON.stringify(rpta);
    } catch (err: any) {
        log('handler.Error:', err);
        response.statusCode = err.status || 500;
        response.body = JSON.stringify({
            msj: err.msj || 'Hubo un error',
        });
    }
    return response;
};
