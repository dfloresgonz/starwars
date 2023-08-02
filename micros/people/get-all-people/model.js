'use strict'

const esp = process.env.IS_OFFLINE || process.env.NODE_ENV == 'test' ? '../../' : ''

const con = require(`${esp}../utils/database`)

module.exports.getPeople = async () => {
    const connection = await con.getCon()
    const [ rows ] = await connection.query('SELECT * FROM `people`')
    return rows
}