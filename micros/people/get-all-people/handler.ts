import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';

import { getPeoples } from './logic';
import { People } from './Models';
import { sumar } from '../../../libs/Calculo';
import { log } from '../../../libs/helpers/log';

const response = {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    body: '',
};

interface Rpta {
    suma: number;
    datos: People[];
}

export const method = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
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
