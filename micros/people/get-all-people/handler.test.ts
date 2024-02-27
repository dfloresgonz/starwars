import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

import { method } from './handler';

const event = {
    headers: {},
} as APIGatewayEvent;

test('Should be 200', async () => {
    event.headers.colegio = 'starwars';
    const rpta: APIGatewayProxyResult = await method(event);

    expect(rpta.statusCode).toBe(200);
    expect(JSON.parse(rpta.body).suma).toBe(12);
    expect(JSON.parse(rpta.body).datos.length).toBeGreaterThanOrEqual(1);
});
