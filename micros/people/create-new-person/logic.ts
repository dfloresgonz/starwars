import { insertPeople, RptaInsert } from './model'

interface IResponse {
    msj: string;
}

const createPerson = async (params):Promise<IResponse> => {
    const data: RptaInsert = await insertPeople(params)
    let rpta: IResponse
    rpta = {
        msj: 'Se registró correctamente'
    }
    return rpta
}

export {
    createPerson,
    IResponse
}