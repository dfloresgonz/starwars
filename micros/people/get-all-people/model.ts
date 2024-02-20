import { People } from './types';
import { pool } from '../../../libs/database';

export const getPeople = async (): Promise<People[]> => {
    const { rows } = await pool.query('SELECT * FROM people');
    return rows;
};
