import { log } from './helpers/log';

export const handleError = (error: any): any => {
    if (!error.cause) {
        log('handleError.error', error);
        log('handleError.error.message', error.message);
    }

    return {
        statusCode: error.cause || 500,
        body: JSON.stringify({
            msj: error.message || 'Hubo un error desconocido',
        }),
    };
};
