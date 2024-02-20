import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';

import { handleError } from '../../../../libs/errors';
import { log } from '../../../../libs/helpers/log';
import { createPerson } from '../service/createPerson';
import { Response, CreatePerson } from '../types';

let response: APIGatewayProxyResult = {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    body: '',
};

export const method = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const bodyparams: string = event.body || '';
        log('bodyparams:', bodyparams);
        // VALIDATIONS
        if (bodyparams === '') {
            throw new Error('No se encontraron parametros');
        }
        // keys exist
        // END VALIDATIONS

        const params: CreatePerson = JSON.parse(bodyparams);
        log('params:', params);

        const resp: Response = await createPerson(params);

        response.body = JSON.stringify(resp);
    } catch (err: any) {
        response = { ...handleError(err) };
    }
    return response;
};
