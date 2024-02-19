import {
    createPool,
    PoolOptions,
    RowDataPacket,
    ResultSetHeader,
    FieldPacket,
    Pool,
} from 'mysql2/promise';

import { HOST_BD, USER_BD, BD_NAME, BD_PASS } from './environment/utilities';

const config: PoolOptions = {
    host: HOST_BD,
    user: USER_BD,
    database: BD_NAME,
    password: BD_PASS,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
};

const getCon = async (): Promise<Pool> => {
    const connection: Pool = createPool(config);
    return connection;
};

export { getCon, RowDataPacket, ResultSetHeader, FieldPacket };
