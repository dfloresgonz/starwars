import { People } from './types';
import { pool } from '../../../libs/database';
// import { getCon, RowDataPacket } from '../../../libs/mysqldatabase';

// export const getPeople = async (): Promise<People[]> => {
//     const connection = await getCon();
//     const [rows] = await connection.query<People[] & RowDataPacket[][]>('SELECT * FROM `people`');
//     return rows;
// };

export const getPeople = async (): Promise<People[]> => {
    const { rows } = await pool.query('SELECT * FROM people');
    return rows;
};
