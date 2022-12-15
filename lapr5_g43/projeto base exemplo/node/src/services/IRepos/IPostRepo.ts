import { Repo } from "../../core/infra/Repo";
import { Post } from "../../domain/post/post";
import { PostId } from "../../domain/post/postId";

export default interface IPostRepo extends Repo<Post> {
    save(post: Post): Promise<Post>;
    remove (userName: Post):Promise<Post>
    updateComment(post: Post): Promise<Post>;
    updateLikes(post: Post): Promise<Post>;
    updateDislikes (post: Post): Promise<Post>
    findByDomainId (postId: PostId | string): Promise<Post>;
    getAll():Promise<Post[]>;
    //findByIds (postsIds: PostId[]): Promise<Post[]>;
    //saveCollection (roles: Post[]): Promise<Post[]>;
    //removeByPostIds (roles: PostId[]): Promise<any>
}