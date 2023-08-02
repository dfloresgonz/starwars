const mysql = require('mysql2/promise')
const password = require('./secret')

const config = {
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
    const pwd = await password.getPassword()
    config.password = pwd
    const connection = mysql.createPool(config)
    return connection
}

exports.getCon = getCon