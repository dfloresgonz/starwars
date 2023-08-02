'use strict';

const con = require('../database')

module.exports.getPeople = async () => {
    const connection = await con.getCon()
    const [ rows ] = await connection.query('SELECT * FROM `people`')
    return rows
}