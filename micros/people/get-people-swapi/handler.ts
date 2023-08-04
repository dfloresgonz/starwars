import {APIGatewayProxyResult} from 'aws-lambda'
import { getPeopleSWAPI, PeopleSwapi } from './logic'

const response = {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    body: '',
}

interface Rpta {
    suma: number,
    datos: PeopleSwapi[]
}

export const method = async (event, context): Promise<APIGatewayProxyResult> => {
    try {
        const resp:PeopleSwapi[] = await getPeopleSWAPI()

        const rpta:Rpta = {
            suma : 2,
            datos: resp
        }

        response.body = JSON.stringify(rpta)
    } catch (err) {
        console.log(err)
        response.statusCode = err.status || 500
        response.body = JSON.stringify({
            msj: err.msj || 'Hubo un error'
        })
    }
    return response;
}