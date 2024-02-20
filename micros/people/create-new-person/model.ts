import { RptaInsert, CreatePerson } from './types';
import { getCon, ResultSetHeader, FieldPacket } from '../../../libs/mysqldatabase';

const sql: string =
    'INSERT INTO `people` (name, birth_year, eye_color, gender, hair_color, skin_color) VALUES (?,?,?,?,?,?)';

export const insertPeople = async (params: CreatePerson): Promise<RptaInsert> => {
    const connection = await getCon();

    const sqlParams: string[] = [
        params.name,
        params.birth_year,
        params.eye_color,
        params.gender,
        params.hair_color,
        params.skin_color,
    ];

    let rpta: RptaInsert;

    [rpta] = await connection.query<ResultSetHeader & FieldPacket[]>(sql, sqlParams);

    // if (rpta.affectedRows !== 1)
    //     throw new Error({ msj: 'Hubo un error al registrar', status: 400 });
    return rpta;
};
