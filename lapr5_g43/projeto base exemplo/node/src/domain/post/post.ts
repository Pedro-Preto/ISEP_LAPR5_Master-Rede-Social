import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

import { Result } from "../../core/logic/Result";
import { PostId } from "./postId";

import IPostDTO from "../dto/IPostDTO";
import { ListCollectionsCursor } from "mongoose/node_modules/mongodb";

interface PostProps {
    postId:string;
    content: string;
    date: Date;
    userId: string;
    likes: number;
    dislikes: number;
    comments: [{commentId: string, commentContent: string, commentDate: Date, commentUserId: string}];
    tags:[{tag:string}]
}

export class Post extends AggregateRoot<PostProps> {
    get id (): UniqueEntityID {
        return this._id;
    }

    get postId (): string {
        return this.props.postId;
    }

    get content (): string {
        return this.props.content;
    }

    get date (): Date {
        return this.props.date;
    }

    get likes (): number {
        return this.props.likes;
    }

    get dislikes (): number {
        return this.props.dislikes;
    }

    get comments (): Object[] {
        return this.props.comments;
    }
    get tags (): Object[] {
        return this.props.tags;
    }

    get userId (): string {
        return this.props.userId;
    }

    set content ( value: string) {
        this.props.content = value;
    }

    set likes ( value: number){
        this.props.likes = value;
    }

    set dislikes ( value: number){
        this.props.dislikes = value;
    }
    set postId(postId:string){
        this.props.postId=postId;
    }
    private constructor (props: PostProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create (postDTO: IPostDTO, id?: UniqueEntityID): Result<Post> {
        const content = postDTO.content;
       const postId=postDTO.postId;
        const date = postDTO.date;
        const userId = postDTO.userId;
        const likes = postDTO.likes;
        const dislikes = postDTO.dislikes;
        const comments = postDTO.comments;
        const tags=postDTO.tags;

        if (!!content === false || content.length === 0) {
            return Result.fail<Post>('Must provide a post content')
        } else if (!!date === false){
            return Result.fail<Post>('Must provide a post date')
        } else if (!!userId === false || userId.length === 0){
            return Result.fail<Post>('Must provide a user id')
        } else {
            const post = new Post({ postId:postId,content: content, date: date, userId: userId, likes: likes, dislikes: dislikes, comments: comments ,tags:tags}, id);
            return Result.ok<Post>( post )
        }
    }
}
