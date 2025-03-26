// mongoose models
import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  role: 'admin' | 'organization' | 'user';
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'organization', 'user'],
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
