import { Student } from './types';
import { database } from '../../../libs/helpers/database';

export const getStudentsRepository = async (): Promise<Student[]> => {
    const { rows } = await database.getPool().query('SELECT * FROM students');
    return rows;
};
