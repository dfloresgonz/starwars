'use strict';

const model = require('./model')

module.exports.createPerson = async (params) => {
    const data = await model.createPerson(params)
    return {
        msj: 'Se registró correctamente'
    }
}