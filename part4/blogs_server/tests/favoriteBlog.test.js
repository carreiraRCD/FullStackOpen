const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
  const listBlogs = [
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
    },
    {
        title: "Another one",
        author: "Nobody",
        likes: 10
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.favoriteBlog(listBlogs)
    assert.deepStrictEqual(result, {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        })
  })
})