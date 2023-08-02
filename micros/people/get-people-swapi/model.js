'use strict';

const fetch = require('node-fetch')
const URL = `https://swapi.py4e.com/api/people`

module.exports.getPeopleSWAPI = async () => {
    
    const response = await fetch(URL, {method: 'GET'});
    const rpta = await response.json()

    return rpta.results
}