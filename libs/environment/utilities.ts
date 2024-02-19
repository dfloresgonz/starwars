import { config } from 'dotenv';

config();

export const HOST_BD: string = process.env.HOST_BD || '';
export const USER_BD: string = process.env.USER_BD || '';
export const BD_NAME: string = process.env.BD_NAME || '';
export const BD_PASS: string = process.env.BD_PASS || '';
