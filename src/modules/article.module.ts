import ArticleSchema from "../models/article.model";
import Joi from 'joi'

interface Article {
    id?: string
    name: string
    email: string
    title: string
    slug: string[]
    content: string
}

class _Article {
    listArticle = async () => {
        try {
            const list = await ArticleSchema.find()

            if (list.length === 0) {
                return {
                    status: false,
                    error: 'Sorry, list article empty'
                }
            }

            return {
                status: true,
                data: list
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
                slug: Joi.array().required(),
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
                slug: body.slug,
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
                slug: Joi.array().required(),
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
                slug: body.slug,
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
}

export default new _Article()