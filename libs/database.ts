import { Pool } from 'pg';

import { HOST_BD, USER_BD, BD_NAME, BD_PASS, BD_PORT } from './environment/utilities';

export const pool = new Pool({
    user: USER_BD,
    host: HOST_BD,
    database: BD_NAME,
    password: BD_PASS,
    port: BD_PORT,
});

export const endPool = async (): Promise<void> => {
    await pool.end();
};
