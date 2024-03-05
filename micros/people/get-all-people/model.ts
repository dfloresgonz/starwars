import { People } from './types';
import { database } from '../../../libs/helpers/database';

export const getPeople = async (colegio: string, readonly: boolean): Promise<People[]> => {
    const { rows } = await database.getPool(colegio, readonly).query('SELECT * FROM people');
    return rows;
};
