const getPeopleSwapi = require('./get-people-swapi/handler')
const getAllPeople = require('./get-all-people/handler')
const createPerson = require('./create-new-person/handler')
if(!process.env.DEPLOY) {
    require('dotenv').config({ path: `./micros/people/.env.local`, override: true })
}

test('GetPeopleSWAPI correcto', async () => {
    const rpta = await getPeopleSwapi.method()
    expect(rpta.statusCode).toBe(200)
})

test('getAllPeople correcto', async () => {
    const rpta = await getAllPeople.method()
    expect(rpta.statusCode).toBe(200)
})

test('createNewPerson correcto', async () => {
    const event = {
        body : JSON.stringify({
            'name'      : `Prueba-${Math.floor(Math.random() * 999999)}`,
            'birth_year': 'ABY 56',
            'eye_color' : 'red',
            'gender'    : 'male',
            'hair_color': 'green',
            'skin_color': 'black'
        })
    }

    const rpta = await createPerson.method(event)
    expect(rpta.statusCode).toBe(200)
})