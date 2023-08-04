import {APIGatewayProxyResult} from 'aws-lambda'

const response = {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    body: '',
}

export const method = async (event, context): Promise<APIGatewayProxyResult> => {
    try {

        // const logic = require('./logic')

        // const resp = await logic.getPeopleSWAPI()

        response.body = JSON.stringify({msj: 'Hi world'})
    } catch (err) {
        console.log(err)
        response.statusCode = err.status || 500
        response.body = JSON.stringify({
            msj: err.msj || 'Hubo un error'
        })
    }
    return response;
}