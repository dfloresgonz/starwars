import { RptaInsert, CreatePerson } from './types/person';
import { getCon, ResultSetHeader, FieldPacket } from '../../../libs/database';

const sql: string =
    'INSERT INTO `people` (name, birth_year, eye_color, gender, hair_color, skin_color) VALUES (?,?,?,?,?,?)';

const insertPeople = async (params: CreatePerson): Promise<RptaInsert> => {
    const connection = await getCon();

    // const __params = [
    //     params.name,
    //     params.birth_year,
    //     params.eye_color,
    //     params.gender,
    //     params.hair_color,
    //     params.skin_color,
    // ];

    let rpta: RptaInsert;

    [rpta] = await connection.query<ResultSetHeader & FieldPacket[]>(sql, __params);

    if (rpta.affectedRows != 1) throw new Error({ msj: 'Hubo un error al registrar', status: 400 });
    return rpta;
};

export { insertPeople };
