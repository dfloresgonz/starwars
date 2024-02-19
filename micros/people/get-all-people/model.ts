import { People } from './types';
import { getCon, RowDataPacket } from '../../../libs/database';

export const getPeople = async (): Promise<People[]> => {
    const connection = await getCon();
    const [rows] = await connection.query<People[] & RowDataPacket[][]>('SELECT * FROM `people`');
    return rows;
};
