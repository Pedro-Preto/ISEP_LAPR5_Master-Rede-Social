import { Service, Inject } from 'typedi';

import IPostRepo from "../services/IRepos/IPostRepo";
import { Post } from "../domain/post/post";
import { PostId } from "../domain/post/postId";
import { PostMap } from "../mappers/PostMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IPostPersistence } from '../dataschema/IPostPersistence';

@Service()
export default class PostRepo implements IPostRepo {
    private models: any;

    constructor(
        @Inject('postSchema') private postSchema : Model<IPostPersistence & Document>,
    ) {}

    private createBaseQuery (): any {
        return {
            where: {},
        }
    }

    public async exists(post: Post): Promise<boolean> {

        const idX = post.id instanceof PostId ? (<PostId>post.id).toValue() : post.id;

        const query = { id: idX};
        const postDocument = await this.postSchema.findOne( query as FilterQuery<IPostPersistence & Document>);

        return !!postDocument === true;
    }

    public async save (post: Post): Promise<Post> {
        const query = { id: post.id.toString()};

        const postDocument = await this.postSchema.findOne( query );
        console.log("Post document");
        console.log(postDocument);

        try {
            if (postDocument === null ) {
                const rawPost: any = PostMap.toPersistence(post);
                
                console.log("raw post");
                console.log(rawPost);
                const postCreated = await this.postSchema.create(rawPost);
                console.log("Post created");
                console.log(postCreated);
                return PostMap.toDomain(postCreated);
            } else {
                postDocument.content = post.content;
                await postDocument.save();

                return post;
            }
        } catch (err) {
            throw err;
        }
    }
    public async remove (post: Post): Promise<Post> {
        const query = { content: post.content.toString()};
        console.log("Estou no repo")
        
        try {
          await this.postSchema.deleteOne( query );
          return post;

        } catch (err) {
            throw err;
        }
    }

    public async updateComment (post: Post): Promise<Post> {
        const query = { content: post.content.toString()};

        const postDocument = await this.postSchema.findOne( query );
        try {
            if (postDocument === null ) {
                const rawPost: any = PostMap.toPersistence(post);

                const postCreated = await this.postSchema.create(rawPost);
           
                return PostMap.toDomain(postCreated);
            } else {
                const postCreated: any = await PostMap.toPersistence(post);
                postDocument.comments = postCreated.comments;
                
                await postDocument.save();

                return post;
            }
        } catch (err) {
            throw err;
        }
    }
    public async updateLikes (post: Post): Promise<Post> {
        const query = { content: post.content.toString()};

        const postDocument = await this.postSchema.findOne( query );
        try {
            if (postDocument === null ) {
                const rawPost: any = PostMap.toPersistence(post);

                const postCreated = await this.postSchema.create(rawPost);

                return PostMap.toDomain(postCreated);
            } else {
                const postCreated: any = await PostMap.toPersistence(post);
                postDocument.likes = postCreated.likes;

                await postDocument.save();

                return post;
            }
        } catch (err) {
            throw err;
        }
    }
    public async updateDislikes (post: Post): Promise<Post> {
        const query = { content: post.content.toString()};

        const postDocument = await this.postSchema.findOne( query );
        try {
            if (postDocument === null ) {
                const rawPost: any = PostMap.toPersistence(post);

                const postCreated = await this.postSchema.create(rawPost);

                return PostMap.toDomain(postCreated);
            } else {
                const postCreated: any = await PostMap.toPersistence(post);
                postDocument.dislikes = postCreated.dislikes;

                await postDocument.save();

                return post;
            }
        } catch (err) {
            throw err;
        }
    }
    public async findByDomainId (postId: PostId | string): Promise<Post> {
        const query = { id: postId};
        const postRecord = await this.postSchema.findOne( query as FilterQuery<IPostPersistence & Document> );
        console.log("Entrei no repositorio e passei o schema, o meu valor é");
        console.log(postRecord);

        if( postRecord != null) {
            return PostMap.toDomain(postRecord);
        }
        else
            return null;
    }

    public async getAll(): Promise<Post[]> {
        var allPostsReturn:Post[]=[];
        const allPosts = await this.postSchema.find({}) ;
        try {
            for (var i = 0; i < allPosts.length; i++) {
                allPostsReturn.push(await PostMap.toDomain(allPosts[i]))
            }
            return allPostsReturn;
        }catch(err){
            throw err;
        }
    }
}