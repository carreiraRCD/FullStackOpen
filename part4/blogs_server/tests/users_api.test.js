const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const User = require('../models/user')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')
const helper = require('./test_helper')

const api = supertest(app)

describe('test for creacion of users', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        for (let user of helper.initialUsers) {
            let userObject = new User(user)
            await userObject.save()
        }
    })

    test('a valid user can be added ', async () => {
          const newUser = {
            username: "User1",
            name: "User One",
            password: "userpass1"
          }
    
          await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
          const usersAtEnd = await helper.usersInDb()
          assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)
        })
    
    test('a user with short username can`t be added', async () => {
        const newUser = {
            username: 'U1',
            name: "User One",
            password: "userpass1"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('a user with short password can`t be added', async () => {
        const newUser = {
            username: 'User1',
            name: "User One",
            password: "up"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('a user without username can`t be added', async () => {
        const newUser = {
            name: "User One",
            password: "userpass1"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('a user without password can`t be added', async () => {
        const newUser = {
            username: 'U1',
            name: "User One",
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })
})






after(async () => {
  await mongoose.connection.close()
})