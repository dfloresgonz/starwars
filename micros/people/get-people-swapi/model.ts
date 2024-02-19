import fetch from 'node-fetch';

import { PeopleSwapi } from './Models';

const URL = `https://swapi.py4e.com/api/people`;
const fetchPeopleSWAPI = async (): Promise<PeopleSwapi[]> => {
    const response: any = await fetch(URL, { method: 'GET' });
    const rpta = await response.json(); //

    return rpta.results;
};

export { fetchPeopleSWAPI, PeopleSwapi };
