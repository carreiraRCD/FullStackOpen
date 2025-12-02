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

const nonExistingId = async () => {
  const blog = new Blog({ title: 'Bastante pronto', author: "Don Sera Borrado", url: "byebye.es", likes: 10 })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}