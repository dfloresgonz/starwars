import { getPeople } from './model';
import { People } from './types';
// import { log } from '../../../libs/helpers/log';

export const getPeoples = async (colegio: string): Promise<People[]> => {
    const data: People[] = await getPeople(colegio);
    // log('getPeoples.data', data);

    return data;
};
