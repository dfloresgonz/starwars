import { config } from 'dotenv';

config();

export const HOST_BD: string = process.env.HOST_BD || '';
export const USER_BD: string = process.env.USER_BD || '';
export const BD_NAME: string = process.env.BD_NAME || 'starwars';
export const BD_PASS: string = process.env.BD_PASS || '';
export const BD_PORT: number = 5432;

export const deploymentEnv: string = process.env.DEPLOYMENT_ENV || 'development';

export const isDevelopment: boolean = deploymentEnv === 'development';

export const isStaging: boolean = deploymentEnv === 'staging';

export const isProduction: boolean = deploymentEnv === 'production';

export const isLocal: boolean = process.env.IS_LOCAL === 'true' || false;

export const CLOUD_PROVIDER: string = process.env.CLOUD_PROVIDER || '';
