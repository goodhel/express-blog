import ArticleSchema from "../models/article.model";
import Joi from 'joi'

interface Article {
    id?: string
    name: string
    email: string
    title: string
    category: string
    tags: string[]
    content: string
}

interface Options {
    sort?: string
    page?: string
    limit?: string
    filter?: string
}

class _Article {
    listArticle = async (options: Options) => {
        try {
            const { sort, page, limit, filter } = options

            let condition = {}
            if (filter) {
                const filterRegex = new RegExp(filter, 'i')
                condition = { title: filterRegex }
            }

            const query = ArticleSchema.find(condition)

            if (sort) {
                const sortBy = sort.split(',').join(' ')
                query.sort(sortBy)
            } else {
                query.sort('-createdAt')
            }

            if (page && limit) {
                query.limit(+limit * 1)
                query.skip((+page - 1) * +limit)
            }

            query.populate('comments')

            const list = await query.exec()

            if (list.length === 0) {
                return {
                    status: false,
                    error: 'Sorry, list article empty'
                }
            }

            // count article
            const count = await ArticleSchema.countDocuments()

            let totalPage = 1

            if (page && limit) {
                totalPage = Math.ceil(count/+limit)
            }

            return {
                status: true,
                data: {
                    list,
                    totalPage
                }
            }
        } catch (error) {
            console.error('listArticle article module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    addArticle = async (body: Article) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required(),
                title: Joi.string().required(),
                category: Joi.string().required(),
                tags: Joi.array().required(),
                content: Joi.string().required(),
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map((detail) => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const add = await ArticleSchema.create({
                name: body.name,
                email: body.email,
                title: body.title,
                category: body.category,
                tags: body.tags,
                content: body.content
            })

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('addArticle article module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    editArticle = async (body: Article) => {
        try {
            const schema = Joi.object({
                id: Joi.string().required(),
                name: Joi.string().required(),
                email: Joi.string().required(),
                title: Joi.string().required(),
                category: Joi.string().required(),
                tags: Joi.array().required(),
                content: Joi.string().required(),
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map((detail) => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const article = await ArticleSchema.findById(body.id)

            if (!article) {
                return {
                    status: false,
                    code: 404,
                    error: 'Sorry, article not found'
                }
            }

            const update = await ArticleSchema.updateOne({ _id: body.id }, {
                name: body.name,
                email: body.email,
                title: body.title,
                category: body.category,
                tags: body.tags,
                content: body.content
            }, { new: true })

            return {
                status: true,
                data: update
            }
        } catch (error) {
            console.error('editArticle article module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    deleteArticle = async (id: string) => {
        try {
            const body = { id }
            const schema = Joi.object({
                id: Joi.string().required()
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map((detail) => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const article = await ArticleSchema.findById(id)

            if (!article) {
                return {
                    status: false,
                    code: 404,
                    error: 'Sorry, article not found'
                }
            }

            article.remove()

            return {
                status: true,
                data: `Article ${id} deleted`
            }
        } catch (error) {
            console.error('deleteArticle article module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    publishArticle = async (id: string) => {
        try {
            const article = await ArticleSchema.findById(id)

            if (!article) {
                return {
                    status: false,
                    code: 404,
                    error: 'Sorry, article not found'
                }
            }

            const update = await ArticleSchema.updateOne({
                published: true,
                publishedAt: Date.now()
            })

            return {
                status: true,
                data: 'Publish successfully'
            }
        } catch (error) {
            console.error('publishArticle article module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

export default new _Article()