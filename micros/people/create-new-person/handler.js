'use strict'

const response = {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    body: '',
}

module.exports.method = async event => {
    try {
        const parsedData = new URLSearchParams( JSON.parse(event.body) )
        const body = {}
        for (var pair of parsedData.entries()) {
            body[pair[0]] = pair[1]
        }

        const logic = require('./logic')

        const resp = await logic.createPerson(body)

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