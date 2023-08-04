import { createPool, PoolOptions, RowDataPacket, ResultSetHeader, FieldPacket } from 'mysql2/promise'
import { getPassword } from './secret'

const config: PoolOptions = {
    host    : process.env.HOST_BD,
    user    : process.env.USER_BD,
    database: process.env.BD_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0
}

const getCon = async () => {
    const pwd = await getPassword()
    config.password = pwd
    const connection = createPool(config)
    return connection
}

export {
    getCon,
    RowDataPacket,
    ResultSetHeader,
    FieldPacket
}