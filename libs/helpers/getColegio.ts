import { APIGatewayProxyEventHeaders } from 'aws-lambda';

import { log } from './log';

export const getColegio = (headers: APIGatewayProxyEventHeaders): string => {
    const colegio: string = headers.colegio || '';

    log('colegio', colegio);

    if (!colegio) {
        throw new Error('No se encontró el colegio');
    }

    return colegio;
};
