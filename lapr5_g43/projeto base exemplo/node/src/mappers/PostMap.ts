import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IPostPersistence } from '../dataschema/IPostPersistence';

import IPostDTO from "../domain/dto/IPostDTO";
import { Post } from "../domain/post/post";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class PostMap extends Mapper<Post> {

    public static toDTO( post: Post): IPostDTO {
        return {
            id: post.id.toString(),
            postId:post.postId,
            content: post.content,
            date: post.date,
            userId: post.userId,
            likes: post.likes,
            dislikes: post.dislikes,
            comments: post.comments,
            tags:post.tags
        } as IPostDTO;
    }

    public static toDomain (post: any | Model<IPostPersistence & Document> ): Post {
        const postOrError = Post.create(
            post,
            new UniqueEntityID(post.domainId)
        );

        postOrError.isFailure ? console.log(postOrError.error) : '';

        return postOrError.isSuccess ? postOrError.getValue() : null;
    }

    public static toPersistence (post: Post): any {
        return {
            domainId: post.id.toString(),
            postId:post.postId,
            content: post.content,
            date: post.date,
            userId: post.userId,
            likes: post.likes,
            dislikes: post.dislikes,
            comments: post.comments,
            tags:post.tags
        }
    }
}