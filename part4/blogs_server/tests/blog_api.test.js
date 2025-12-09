const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')
const helper = require('./test_helper')

const api = supertest(app)

describe('test for backend of Blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  describe('test for api GET to /api/blogs', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/) //Expresion regular para evitar problemas de cadenas
    })

    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('identifacator is id', async () => {
        const response = await api.get('/api/blogs')

        assert.ok(response.body[0].id)
    })
  })

  describe('test for api POST to /api/blogs', () => {
    test('a valid blog can be added ', async () => {
      const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'meu pai',
        url: 'bailando.xv',
        likes: 4
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(b => b.title)
      assert(titles.includes(newBlog.title))
    })

    test('blog without likes, values 0', async () => {
        const newBlog = {
            title: 'async/await simplifies making async calls',
            author: 'meu pai',
            url: 'bailando.xv'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
        
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd[blogsAtEnd.length-1].likes, 0)
    })

    test('blog without any var empty', async () => {
        const newBlog = {
            author: 'Don Falso',
            likes: 19
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
  })
})

describe('test for api DELETE /api/blogs/id', () => {
  test('delete a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map(b => b.title)
    assert(!titles.includes(blogToDelete.title))
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })

  test('delete a non existant blog', async () => {
    await api
          .delete(`/api/blogs/25`)
          .expect(400)
  })
})


after(async () => {
  await mongoose.connection.close()
})