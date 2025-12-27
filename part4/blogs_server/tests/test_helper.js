const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUsers = []

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, initialUsers, usersInDb
}