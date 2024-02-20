import { getPeople } from './model';
import { People } from './types';
import { endPool } from '../../../libs/database';
import { log } from '../../../libs/helpers/log';

export const getPeoples = async (): Promise<People[]> => {
    const data: People[] = await getPeople();
    log('getPeoples.data', data);

    await endPool();

    return data;
};
