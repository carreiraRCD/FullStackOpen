const blogRouter = require(`express`).Router()
const Blog = require(`../models/blog`)

//Visualizacion de blogs
blogRouter.get(`/`, (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs)
        })
})

//Adición de blogs a la BDD
blogRouter.post(`/`, (req, res, next) => {
    const body = req.body

    if (body.title === undefined ||
        body.author === undefined ||
        body.url === undefined        
    ){
        return res.status(400).json({error: 'blog missing'})
    }

    const blog = new Blog({
        author: body.author,
        title: body.title,
        url: body.url,
        likes: Math.floor(Math.random()*11)
    })

    blog.save().then(savedBlog => {
        res.json(savedBlog)
    })
    .catch(error => next(error))
})

//Exportación del modulo
module.exports = blogRouter