'use strict';

const model = require('./model')

module.exports.getPeople = async (params) => {
    const data = await model.getPeople()
    return data
}