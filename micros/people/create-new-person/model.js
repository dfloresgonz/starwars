'use strict';

const con = require('../database')

module.exports.createPerson = async (params) => {
    const connection = await con.getCon()
    const __params = [params.name, params.birth_year, params.eye_color, params.gender, params.hair_color, params.skin_color]
    const rpta = await connection.query('INSERT INTO `people` (name, birth_year, eye_color, gender, hair_color, skin_color) VALUES (?,?,?,?,?,?) ', __params)
    if(rpta[0].affectedRows != 1) throw {msj: 'Hubo un error al registrar', status: 400}
    return rpta
}