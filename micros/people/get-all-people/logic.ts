import { getPeople } from './model';
import { People } from './Models';

export const getPeoples = async (): Promise<People[]> => {
    const data = await getPeople();
    return data;
};
