import { Service, Inject } from 'typedi';
import config from "../../config";
import IPostDTO from '../domain/dto/IPostDTO';
import { Post } from "../domain/post/post";
import IPostRepo from '../services/IRepos/IPostRepo';
import IPostService from './IServices/IPostService';
import { Result } from "../core/logic/Result";
import { PostMap } from "../mappers/PostMap";
import {ObjectID} from "mongodb/mongodb.ts34";
import {Comment} from "../domain/comment/comment";
import ICommentDTO from "../domain/dto/ICommentDTO";

@Service()
export default // @ts-ignore
class PostService implements IPostService {
    constructor(
        // @ts-ignore
        @Inject(config.repos.post.name) private postRepo : IPostRepo
    ) {}

    public async getPost( postId: string): Promise<Result<IPostDTO>> {
        try {
            const post = await this.postRepo.findByDomainId(postId);
            console.log("Entrei no service e passei o repositorio, o meu valor é");
            console.log(post);

            if (post === null) {
                return Result.fail<IPostDTO>("Post not found");
            }
            else {
                const postDTOResult = PostMap.toDTO( post ) as IPostDTO;
                return Result.ok<IPostDTO>( postDTOResult )
            }
        } catch (e) {
            throw e;
        }
    }
    public async makeComment(postDTO: IPostDTO): Promise<Result<IPostDTO>> {
        try {
            console.log("a comentar")
            let wantedPost:Post;
            const allPosts = await this.postRepo.getAll();
            console.log(postDTO.content)

            for(let i=0;i<allPosts.length;i++){
                if(allPosts[i].postId==postDTO.postId ){
                    wantedPost=allPosts[i];
                } 
            }
            
             wantedPost.comments.push({commentContent: postDTO.comments[0].commentContent, commentDate: new Date(), commentUserId: postDTO.comments[0].commentUserId})
        /*    for(let i=0;i<wantedPost.comments.length;i++){

                console.log(wantedPost.comments[i])
            }*/
            console.log(wantedPost)

            await this.postRepo.updateComment(wantedPost);
          
            const postDTOResult = PostMap.toDTO( wantedPost ) as IPostDTO;
        
            return Result.ok<IPostDTO>( postDTOResult )
            
        } catch (e) {
            throw e;
        }
    }

    public async like(postDTO: IPostDTO): Promise<Result<IPostDTO>> {
        try {
            console.log("a dar like")
            let wantedPost:Post;
            const allPosts = await this.postRepo.getAll();
            console.log(postDTO.content)

            for(let i=0;i<allPosts.length;i++){
                if(allPosts[i].postId==postDTO.postId ){
                    wantedPost=allPosts[i];
                }
            }

            wantedPost.likes++;
            
            console.log(wantedPost)

            await this.postRepo.updateLikes(wantedPost);

            const postDTOResult = PostMap.toDTO( wantedPost ) as IPostDTO;

            return Result.ok<IPostDTO>( postDTOResult )

        } catch (e) {
            throw e;
        }
    }
    public async dislike(postDTO: IPostDTO): Promise<Result<IPostDTO>> {
        try {
            console.log("a dar like")
            let wantedPost:Post;
            const allPosts = await this.postRepo.getAll();
            console.log(postDTO.content)

            for(let i=0;i<allPosts.length;i++){
                if(allPosts[i].postId==postDTO.postId ){
                    wantedPost=allPosts[i];
                }
            }

            wantedPost.dislikes++;

            console.log(wantedPost)

            await this.postRepo.updateDislikes(wantedPost);

            const postDTOResult = PostMap.toDTO( wantedPost ) as IPostDTO;

            return Result.ok<IPostDTO>( postDTOResult )

        } catch (e) {
            throw e;
        }
    }
    public async removePostsOfUser(postDTO: IPostDTO): Promise<Result<IPostDTO>> {
        try {
            console.log("a remover post do user")
            let wantedPost:Post[]=[];
            const allPosts = await this.postRepo.getAll();
            console.log(postDTO.userId)

            for(let i=0;i<allPosts.length;i++){
                console.log("aquiiii")
                console.log(allPosts[i])
                console.log("============")
                if(allPosts[i].postId==postDTO.postId ){
                    wantedPost.push(allPosts[i]);
                }
            }
            console.log("chueguei aqui")
            console.log(wantedPost)
            for(let j=0;j<wantedPost.length;j++) {
                
                await this.postRepo.remove(wantedPost[j]);
            }
            const postDTOResult = PostMap.toDTO( wantedPost[0] ) as IPostDTO;

            return Result.ok<IPostDTO>( postDTOResult )

        } catch (e) {
            throw e;
        }
    }
    
    
    public async createPost(postDTO: IPostDTO): Promise<Result<IPostDTO>> {
        try {

            const postOrError = await Post.create( postDTO );

            if (postOrError.isFailure) {
                return Result.fail<IPostDTO>(postOrError.errorValue());
            }
            const postResult = postOrError.getValue();
            postResult.postId=postResult.id.toValue().toString();
            
            await this.postRepo.save(postResult);

            const postDTOResult = PostMap.toDTO( postResult ) as IPostDTO;
            return Result.ok<IPostDTO>( postDTOResult )
        } catch (e) {
            throw e;
        }
    }

    public async updatePost(postDTO: IPostDTO): Promise<Result<IPostDTO>> {
        try {
            const post = await this.postRepo.findByDomainId(postDTO.id);

            if (post === null) {
                return Result.fail<IPostDTO>("Post not found");
            }
            else {
                post.content = postDTO.content;
                await this.postRepo.save(post);

                const postDTOResult = PostMap.toDTO( post ) as IPostDTO;
                return Result.ok<IPostDTO>( postDTOResult )
            }
        } catch (e) {
            throw e;
        }
    }
    public async getAll(): Promise<IPostDTO[]> {
        try {
            var allPostResult:IPostDTO[]=[];
            const allPosts = await this.postRepo.getAll();

            if (allPosts === null) {
                return null;
            }
            for(var i=0; i<allPosts.length; i++){
                allPostResult.push(await PostMap.toDTO(allPosts[i]));
            }
            return allPostResult;
        } catch (e) {
            throw e;
        }
    }
    
    
    

}
