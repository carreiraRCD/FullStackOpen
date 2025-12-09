const blogRouter = require(`express`).Router()
const Blog = require(`../models/blog`)

//Visualizacion de blogs
blogRouter.get(`/`, async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

//Adición de blogs a la BDD
blogRouter.post(`/`, async (req, res, next) => {
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
        likes: body.likes ? body.likes : 0
    })

    try{
        const savedBlog = await blog.save()
        res.status(201).json(savedBlog)
    } catch (exception) {
        next(exception)
    }

})

blogRouter.delete('/:id', async (req, res, next) => {
    try{
        await Blog.findByIdAndDelete(req.params.id)
        res.status(204).end()
    }catch (exception) {
        next(exception)
    }
})

blogRouter.put('/:id', async (req, res, next) => {
    const body = req.body

    const blog = await Blog.findById(req.params.id)
    if (!blog) return res.status(404).end()

    try{
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {likes: blog.likes + 1}, {new: true})
        res.status(200)
        res.json(updatedBlog)
    } catch (exception) {
        next(exception)
    }
})

//Exportación del modulo
module.exports = blogRouter