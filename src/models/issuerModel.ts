import mongoose, { Document, Schema } from 'mongoose'

export interface IssuerDocument extends Document {
    username: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
}

const IssuerSchema = new Schema<IssuerDocument>(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    { timestamps: true }
)

const Issuer = mongoose.model<IssuerDocument>('Issuer', IssuerSchema)
export default Issuer
