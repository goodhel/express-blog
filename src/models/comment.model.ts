import { model, Schema, Types } from 'mongoose'

interface Comment {
    article: Types.ObjectId
    name: string
    email: string
    url: string
    content: string
}

const commentSchema = new Schema<Comment>({
    article: { type: Schema.Types.ObjectId, required: true, ref: 'Article' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    url: { type: String },
    content: { type: String, required: true }
}, {
    timestamps: true
})

const CommentSchema = model<Comment>('Comment', commentSchema)

export default CommentSchema