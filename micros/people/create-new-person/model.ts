import { getCon, ResultSetHeader, FieldPacket } from '../../../libs/database'

interface RptaInsert {
    affectedRows: number;
}

const insertPeople = async (params):Promise<RptaInsert> => {
    const connection = await getCon()
    const __params = [params.name, params.birth_year, params.eye_color, params.gender, params.hair_color, params.skin_color]
    let rpta:RptaInsert
    [rpta] = await connection.query<ResultSetHeader & FieldPacket[]>('INSERT INTO `people` (name, birth_year, eye_color, gender, hair_color, skin_color) VALUES (?,?,?,?,?,?) ', __params)
    if(rpta.affectedRows != 1) throw {msj: 'Hubo un error al registrar', status: 400}
    return rpta
}

export {
    insertPeople,
    RptaInsert
}