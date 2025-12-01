const lodash = require('lodash')

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, blog) => {
        return max.likes > blog.likes ? max : blog
    })
}

const mostBlogs = (blogs) => {
  const grouped = lodash.groupBy(blogs, 'author')
  const blogsByAuthor = lodash.mapValues(grouped, numBlogs => numBlogs.length)

  const maxAuthor = Object.entries(blogsByAuthor).reduce((max, [author, blogs]) => {
        return blogs > max.blogs ? { author, blogs } : max
    }, { author: null, blogs: 0 })

    return maxAuthor
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}