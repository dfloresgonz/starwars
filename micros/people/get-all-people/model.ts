import { People } from './types';
import { database } from '../../../libs/helpers/database';

export const getPeople = async (): Promise<People[]> => {
    const { rows } = await database.getPool().query('SELECT * FROM people');
    return rows;
};
