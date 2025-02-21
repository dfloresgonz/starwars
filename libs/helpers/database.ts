import { Pool } from 'pg';

import { HOST_BD, USER_BD, BD_PASS, BD_PORT } from '../environment/utilities';

export class database {
    private static pool: Pool;

    static config: any = {
        user: USER_BD,
        host: HOST_BD,
        database: 'starwars',
        password: BD_PASS,
        port: BD_PORT,
    };

    public static getPool(): Pool {
        if (!this.pool) {
            // this.config.database = colegio;
            // this.config.host = readonly ? HOST_BD_READONLY : HOST_BD;
            this.pool = new Pool(this.config);
        }
        return this.pool;
    }

    public static async endPool(): Promise<void> {
        if (this.pool) {
            await this.pool.end();
        }
    }
}
