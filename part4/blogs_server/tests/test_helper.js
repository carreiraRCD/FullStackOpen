const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "string.reduction.es",
        likes: 12
    },
    {
        title: "Another one",
        author: "Nobody",
        url: "nothing.tv",
        likes: 10
    }
]

module.exports = {
  initialBlogs
}