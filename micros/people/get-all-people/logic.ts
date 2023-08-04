import {getPeople} from './model'

export const getPeoples = async () => {
    const data = await getPeople()
    return data
}