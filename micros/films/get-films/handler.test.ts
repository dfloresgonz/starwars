import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

import { method } from './handler';

const event = {} as APIGatewayEvent;

test('Should be 200', async () => {
    const rpta: APIGatewayProxyResult = await method(event);

    expect(rpta.statusCode).toBe(200);
});
