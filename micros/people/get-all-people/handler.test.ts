import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

import { method } from './handler';

const event = {} as APIGatewayEvent;
// const context = {} as Context;

test('Should be 200', async () => {
    const rpta: APIGatewayProxyResult = await method(event);

    expect(rpta.statusCode).toBe(200);
    expect(JSON.parse(rpta.body).suma).toBe(14);
    expect(JSON.parse(rpta.body).datos.length).toBeGreaterThanOrEqual(1);
});
