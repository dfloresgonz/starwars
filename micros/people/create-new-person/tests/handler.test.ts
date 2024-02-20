import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

import { method } from '../controller/handler';

const event = {
    body: JSON.stringify({
        name: `Testeada-${Math.floor(Math.random() * 999999)}`,
        birth_year: 'AC 78',
        eye_color: 'green',
        gender: 'female',
        hair_color: 'black',
        skin_color: 'red',
    }),
} as APIGatewayEvent;
// const context = {} as Context;

test('Should be 200', async () => {
    const rpta: APIGatewayProxyResult = await method(event);

    expect(rpta.statusCode).toBe(200);
});
