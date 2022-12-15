import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';

import ICommentDTO from "../domain/dto/ICommentDTO";
import { Comment } from "../domain/comment/comment";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class CommentMap extends Mapper<Comment> {

    public static toDTO( comment: Comment): ICommentDTO {
        return {
            id: comment.id.toString(),
            content: comment.content,
            date: comment.date,
            userId: comment.userId
        } as ICommentDTO;
    }
}