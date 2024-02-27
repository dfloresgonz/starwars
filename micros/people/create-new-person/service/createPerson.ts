import { log } from '../../../../libs/helpers/log';
import { insertPeople } from '../repository/insertPeople';
import { CreatePerson, Response } from '../types';

export const createPerson = async (colegio: string, params: CreatePerson): Promise<Response> => {
    const data: boolean = await insertPeople(colegio, params);

    log('createPerson.rpta:', data);

    if (!data) throw new Error('Error en logic.createPerson');

    // const age: number = 15;
    // if (age < 18) throw new Error('No se puede registrar a menores de edad', { cause: 400 });

    const rpta: Response = {
        msj: 'Se registró correctamente',
    };
    return rpta;
};
