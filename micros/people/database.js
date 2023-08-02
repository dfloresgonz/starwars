const mysql = require('mysql2/promise')
const password = require('./secret')

const config = {
    host    : process.env.HOST,
    user    : process.env.USER,
    database: process.env.BD,
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