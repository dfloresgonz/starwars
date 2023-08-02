'use strict'

let response = {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    body: '',
}

module.exports.method = async event => {
    try {
        const logic = require('./logic')

        const resp = await logic.getPeople()

        response.body = JSON.stringify(resp)
    } catch (err) {
        console.log(err)
        response.statusCode = err.status || 500
        response.body = JSON.stringify({
            msj: err.msj || 'Hubo un error'
        })
    }
    return response;
}