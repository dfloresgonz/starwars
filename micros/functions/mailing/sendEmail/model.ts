import fetch from 'node-fetch';

import { PeopleSwapi } from './types';
import { URL_SWAPI } from '../../../../libs/environment/constants';

export const fetchPeopleSWAPI = async (): Promise<PeopleSwapi[]> => {
    const response: any = await fetch(URL_SWAPI, { method: 'GET' });
    const rpta = await response.json();

    return rpta.results;
};
