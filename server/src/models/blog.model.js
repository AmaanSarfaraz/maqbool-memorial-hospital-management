import mongoose, {Schema} from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        refPath: 'authorType',
        required: true,
    },
    authorType: {
      type: String,
      enum: ['Doctor', 'Admin', 'Patient'],
      required: true,
    },
    image: {
      type: String,
      required: true,
    }
}, {timestamps: true});

export const Blog = mongoose.model('Blog', blogSchema);