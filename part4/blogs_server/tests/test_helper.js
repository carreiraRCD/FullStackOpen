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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}