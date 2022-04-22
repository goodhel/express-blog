import { model, Schema, Types } from 'mongoose'

interface Article {
    name: string
    email: string
    title: string
    category: string
    likes: number
    tags: string[]
    content: string
    published: boolean
    publishedAt: Date,
    comments: Types.ObjectId[]
}

const articleSchema = new Schema<Article>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    likes: { type: Number, default: 0 },
    tags: { type: [String] },
    content: { type: String, required: true },
    published: { type: Boolean, required: true, default: false },
    publishedAt: { type: Date },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, {
    timestamps: true
})

const ArticleSchema = model<Article>('Article', articleSchema)

export default ArticleSchema