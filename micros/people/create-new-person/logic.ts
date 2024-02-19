import { insertPeople } from './model';
import { CreatePerson, Response, RptaInsert } from './types/Types';

const createPerson = async (params: CreatePerson): Promise<Response> => {
    const data: RptaInsert = await insertPeople(params);
    const rpta: Response = {
        msj: 'Se registró correctamente',
    };
    return rpta;
};

export { createPerson };
