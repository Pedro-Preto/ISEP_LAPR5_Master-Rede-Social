import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

import { Result } from "../../core/logic/Result";
import { CommentId } from "./commentId";

import ICommentDTO from "../dto/ICommentDTO";

interface CommentProps {
    content: string;
    date: Date;
    userId: string;
}

export class Comment extends AggregateRoot<CommentProps> {
    get id (): UniqueEntityID {
        return this._id;
    }

    get commentId (): CommentId {
        return new CommentId(this.commentId.toValue());
    }

    get content (): string {
        return this.props.content;
    }

    get date (): Date {
        return this.props.date;
    }

    get userId (): string {
        return this.props.userId;
    }

    set content ( value: string) {
        this.props.content = value;
    }

    set date (value: Date) {
        this.props.date = value; 
    }

    set userId (value: string){
        this.props.userId = value;
    }
    
    private constructor (props: CommentProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create (commentDto: ICommentDTO, id?: UniqueEntityID): Result<Comment> {
        const content = commentDto.content;
        const date = commentDto.date;
        const userId = commentDto.userId;

        if (!!content === false || content.length === 0) {
            return Result.fail<Comment>('Must provide a comment content')
        } else if (!!date === false){
            return Result.fail<Comment>('Must provide a comment date')
        } else if (!!userId === false || userId.length === 0){
            return Result.fail<Comment>('Must provide a user id')
        }else {
            const comment = new Comment({ content: content, date: date, userId: userId }, id);
            return Result.ok<Comment>( comment )
        }
    }
    public static createWithStrings (content1:string,date1:Date,userId1:string, id?: UniqueEntityID): Result<Comment> {
        const content = content1;
        const date = date1;
        const userId = userId1;

        if (!!content === false || content.length === 0) {
            return Result.fail<Comment>('Must provide a comment content')
        } else if (!!date === false){
            return Result.fail<Comment>('Must provide a comment date')
        } else if (!!userId === false || userId.length === 0){
            return Result.fail<Comment>('Must provide a user id')
        }else {
            const comment = new Comment({ content: content, date: date, userId: userId }, id);
            return Result.ok<Comment>( comment )
        }
    }
}
