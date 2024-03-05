import { database } from '../../../../libs/helpers/database';
import { log } from '../../../../libs/helpers/log';
import { CreatePerson } from '../types';

const text: string =
    'INSERT INTO people (name, birth_year, eye_color, gender, hair_color, skin_color) VALUES ($1,$2,$3,$4,$5,$6)';

export const insertPeople = async (
    colegio: string,
    params: CreatePerson,
    readonly: boolean,
): Promise<boolean> => {
    try {
        const query = {
            text,
            values: [
                params.name,
                params.birth_year,
                params.eye_color,
                params.gender,
                params.hair_color,
                params.skin_color,
            ],
        };

        const res = await database.getPool(colegio, readonly).query(query);
        log('insertPeople.rowCount:', res.rowCount);

        if (res.rowCount !== 1) return false;

        return true;
    } catch (error: any) {
        log('insertPeople.error:', error);
        log('insertPeople.error.message:', error.message);
        throw new Error('Error en insertPeople');
    }
};
