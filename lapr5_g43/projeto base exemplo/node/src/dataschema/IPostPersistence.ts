export interface IPostPersistence {
    id: string;
    postId:string;
    content: string;
    date: Date;
    userId: string;
    likes: number;
    dislikes: number;
    comments: [{commentId: string, commentContent: string, commentDate: Date, commentUserId: string}]
    tags:[{tag:string}]

}