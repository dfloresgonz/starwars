import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';

import { createPerson } from './logic';
import { Response, CreatePerson } from './types/person';
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
        const bodyparams: string = event.body || '';
        log('bodyparams:', bodyparams);
        // VALIDATIONS
        if (bodyparams === '') {
            throw new Error('No se encontraron parametros');
        }
        // END VALIDATIONS
        // const parsedData = new URLSearchParams(JSON.parse(bodyparams));
        // log('parsedData:', parsedData);

        const params: CreatePerson = JSON.parse(bodyparams);

        // for (var pair of parsedData.entries()) {
        //     params[pair[0]] = pair[1];
        // }

        log('params:', params);
        const resp: Response = await createPerson(params);

        response.body = JSON.stringify(resp);
    } catch (err: any) {
        log('Error', err);
        response.statusCode = err.status || 500;
        response.body = JSON.stringify({
            msj: err.msj || 'Hubo un error',
        });
    }
    return response;
};
