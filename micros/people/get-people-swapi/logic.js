'use strict';

const model = require('./model')
const dictionary = {
    "name"      : "nombre",
    "height"    : "talla",
    "mass"      : "peso",
    "hair_color": "color_cabello",
    "skin_color": "color_piel",
    "eye_color" : "color_ojos",
    "birth_year": "anio_nacimiento",
    "gender"    : "sexo",
    "homeworld" : "planeta_origen",
    "films"     : "peliculas",
    "species"   : "especies",
    "vehicles"  : "vehiculos",
    "starships" : "naves",
    "created"   : "fecha_creacion",
    "edited"    : "fecha_edicion",
    "url"       : "url"
  }

module.exports.getPeopleSWAPI = async () => {
    const people = await model.getPeopleSWAPI()

    for(let pers of people) {
        const keys = Object.entries(pers)
        for (let [key, value] of keys) {
            pers[dictionary[key]] = value
            delete pers[key]
        }
    }

    return people
}