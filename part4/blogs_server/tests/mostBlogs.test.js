const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
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

  test('test the author with most blogs', () => {
    const result = listHelper.mostBlogs(listBlogs)
    assert.deepStrictEqual(result, {
            author: "Edsger W. Dijkstra",
            blogs: 2
        })
  })
})