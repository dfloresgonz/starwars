import { getPeople } from './model';
import { People } from './types';

export const getPeoples = async (): Promise<People[]> => {
    const data: People[] = await getPeople();
    return data;
};
