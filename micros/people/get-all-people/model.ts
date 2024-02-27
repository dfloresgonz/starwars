import { People } from './types';
import { database } from '../../../libs/helpers/database';

export const getPeople = async (colegio: string): Promise<People[]> => {
    const { rows } = await database.getPool(colegio).query('SELECT * FROM people');
    return rows;
};
