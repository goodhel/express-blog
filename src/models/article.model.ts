import { model, Schema, Types } from 'mongoose'

interface Article {
    name: string
    email: string
    title: string
    slug: string[]
    content: string
    published: boolean
    publishedAt: Date
}

const articleSchema = new Schema<Article>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: [String] },
    content: { type: String, required: true },
    published: { type: Boolean, required: true, default: false },
    publishedAt: { type: Date },
}, {
    timestamps: true
})

const ArticleSchema = model<Article>('Article', articleSchema)

export default ArticleSchema