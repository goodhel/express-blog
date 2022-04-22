import CommentSchema from "../models/comment.model";
import Joi from 'joi'

interface Comment {
    id?: string
    article?: string,
    name: string
    email: string
    url: string
    content: string
}

class _Comment {
    listComment = async () => {
        try {
            const list = await CommentSchema.find()

            if (list.length === 0) {
                return {
                    status: false,
                    error: 'Sorry, list commet empty'
                }
            }

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listComment comment module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    listCommentByArticle = async (id: string) => {
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

            const list = await CommentSchema.find({
                article: id
            })

            if (list.length === 0) {
                return {
                    status: false,
                    error: 'Sorry, list commet empty'
                }
            }

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listComment comment module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    addComment = async (body: Comment) => {
        try {
            const schema = Joi.object({
                article: Joi.string().required(),
                name: Joi.string().required(),
                email: Joi.string().required(),
                content: Joi.string().required(),
                url: Joi.string()
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

            const add = await CommentSchema.create({
                article: body.article,
                name: body.name,
                email: body.email,
                content: body.content,
                url: body.url
            })

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('addComment comment module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    editComment = async (body: Comment) => {
        try {
            const schema = Joi.object({
                id: Joi.string().required(),
                name: Joi.string().required(),
                email: Joi.string().required(),
                content: Joi.string().required(),
                url: Joi.string()
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

            const checkComment = await CommentSchema.findById(body.id)

            if (!checkComment) {
                return {
                    status: false,
                    code: 404,
                    error: 'Sorry, comment not found'
                }
            }

            const update = await CommentSchema.updateOne({ _id: body.id },{
                name: body.name,
                email: body.email,
                content: body.content,
                url: body.url
            }, { new: true })

            return {
                status: true,
                data: update
            }
        } catch (error) {
            console.error('addComment comment module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    deleteComment = async (id: string) => {
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

            const comment = await CommentSchema.findById(id)

            if (!comment) {
                return {
                    status: false,
                    code: 404,
                    error: 'Sorry, comment not found'
                }
            }

            comment.remove()

            return {
                status: true,
                data: `Comment ${id} deleted`
            }
        } catch (error) {
            console.error('deleteComment comment module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

export default new _Comment()