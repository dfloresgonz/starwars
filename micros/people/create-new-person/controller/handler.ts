import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';

import { database } from '../../../../libs/helpers/database';
import { handleError } from '../../../../libs/helpers/errors';
import { getColegio } from '../../../../libs/helpers/getColegio';
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
        const colegio: string = getColegio(event.headers);
        log('colegio', colegio);

        if (!colegio) {
            throw new Error('No se encontró el colegio');
        }

        const bodyparams: string = event.body || '';
        log('bodyparams:', bodyparams);
        // VALIDATIONS
        if (bodyparams === '') {
            throw new Error('No se encontraron parametros');
        }

        const params: CreatePerson = JSON.parse(bodyparams);
        log('params:', params);

        const resp: Response = await createPerson(colegio, params);

        response.body = JSON.stringify(resp);
    } catch (err: any) {
        response = { ...handleError(err) };
    } finally {
        await database.endPool();
    }
    return response;
};
