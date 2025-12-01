const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most likes', () => {
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
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
    },
  ]

  test('test the author with most likes', () => {
    const result = listHelper.mostLikes(listBlogs)
    assert.deepStrictEqual(result, {
            author: "Edsger W. Dijkstra",
            likes: 24
        })
  })
})