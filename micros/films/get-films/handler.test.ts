import { method } from './handler'
import { Context, APIGatewayProxyResult, APIGatewayEvent} from 'aws-lambda'

const event   = {} as APIGatewayEvent;
const context = {} as Context;


test('Should be 200', async () => {
    const rpta:APIGatewayProxyResult = await method(event, context)

    expect(rpta.statusCode).toBe(200)
})