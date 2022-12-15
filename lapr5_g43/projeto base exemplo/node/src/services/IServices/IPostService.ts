import { Result } from "../../core/logic/Result";
import IPostDTO from "../../domain/dto/IPostDTO";

export default interface IPostService  {
    createPost(postDTO: IPostDTO): Promise<Result<IPostDTO>>;
    updatePost(postDTO: IPostDTO): Promise<Result<IPostDTO>>;
    getPost (postDTO: string): Promise<Result<IPostDTO>>;
    getAll():Promise<IPostDTO[]>;
    makeComment(postDTO: IPostDTO):Promise<Result<IPostDTO>>;
    like(postDTO: IPostDTO):Promise<Result<IPostDTO>>;
    dislike(postDTO: IPostDTO):Promise<Result<IPostDTO>>;
    removePostsOfUser(postDTO: IPostDTO):Promise<Result<IPostDTO>>;
}
