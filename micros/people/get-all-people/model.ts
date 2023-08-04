import { getCon, RowDataPacket } from '../../../libs/database'
import { People } from './Models'
const esp = process.env.IS_OFFLINE || process.env.NODE_ENV == 'test' ? '../../' : ''

// const con = require(`${esp}../utils/database`)

export const getPeople = async ():Promise<People[]> => {
    const connection = await getCon()
    const [rows] = await connection.query<People[] & RowDataPacket[][]>('SELECT * FROM `people`')
    return rows
}