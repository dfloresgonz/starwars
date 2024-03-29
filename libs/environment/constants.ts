import { QUEUE_URL } from './utilities';

export const DEPLOYMENT_ENV: string = process.env.DEPLOYMENT_ENV || 'local';
export const QUEUE_TEST: string = `${QUEUE_URL}/starwars-queues-email-${DEPLOYMENT_ENV}-email-queue`;
// export const QUEUE_TEST: string = 'http://localhost.localstack.cloud:4566/000000000000/diego-test';
// export const QUEUE_TEST: string = 'https://sqs.us-east-1.amazonaws.com/794809034213/diego-test';
export const URL_SWAPI: string = 'https://swapi.py4e.com/api/people';
