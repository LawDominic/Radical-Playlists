/**
 *  @jest-environment node
 */

const mongoose = require('mongoose') 
const supertest = require('supertest')
const fs = require('fs')
const app = require('../app')

const { Playlist, User } = require("../models/playlists");

const api = supertest(app)

/**
 * Load sample data into the database for testing
 * 
 * @param {String} fileName JSON data filename
 */
const sampleData =  async (fileName) => {
    const rawData = fs.readFileSync(fileName)
    const data = JSON.parse(rawData)

// use a for loop rather than map because we want await
    for(let i=0; i< data.users.length; i++) {
        const record = data.users[i]
        const l = new User(record)
        await l.save() 
    }

    for(let i=0; i< data.playlists.length; i++) {
        const record = data.playlists[i]
        const l = new Playlist(record)
        await l.save() 
    }
}

describe('apiTests', () => {
    beforeEach(async () => {
        sampleData("server/sampledata.json")
    })

    test('get request returns JSON', async () => {
        await api.get('/playlists')
                .expect(200)
                .expect('Content-Type', /application\/json/)
    })


    test('get request returns JSON with provided ID', async () => {
        await api.get('/users/neil.roberts432')
                .expect(200)
                .expect('Content-Type', /application\/json/)
    })

    test('there are three playlist records', async () => {
        const response = await api.get('/playlists')
        console.log(';t', response)
        expect(response).toHaveLength(2)
    })


    afterEach(async () => {
        await User.deleteMany({})
        await Playlist.deleteMany({})
    })

    afterAll(() => {
        mongoose.connection.close()
    })
})




