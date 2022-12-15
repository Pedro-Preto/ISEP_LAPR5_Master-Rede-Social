import { IPostPersistence } from '../../dataschema/IPostPersistence';
import * as mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            unique: true
        },
        postId: {
            type: String,
            unique: false
        },

        content: {
            type: String,
            unique: false
        },

        date: {
            type: Date,
            unique: false
        },

        userId: {
            type: String,
            unique: false
        },

        likes: {
            type: Number,
            unique: false
        },

        dislikes: {
            type: Number,
            unique: false

        },

        comments: [
            {
                commentId: {
                    type: String,
                    unique: true
                },

                commentContent: {
                    type: String,
                    unique: false
                },

                commentDate: {
                    type: Date,
                    unique: false
                }, 

                commentUserId: { 
                    type: String, 
                    unique: false 
                }

            }

        ],
        tags:[
            {
                tag:String,
                unique:false
            }
            ]
    }
);

export default mongoose.model<IPostPersistence & mongoose.Document>('Post', PostSchema);
