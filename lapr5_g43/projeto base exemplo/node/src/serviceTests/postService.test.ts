import * as sinon from 'sinon';
import * as mocha from 'mocha';
import { expect } from 'chai';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import config from "../../config";

import IPostRepo from '../repos/postRepo';
import { Post } from '../domain/post/post';
import { PostMap } from "../mappers/PostMap";
import PostRepo from "../repos/postRepo";
import IPostDTO from "../domain/dto/IPostDTO";
import PostService from "../services/postService";
import postSchema from "../persistence/schemas/postSchema";



describe('Post Service', function () {
    beforeEach(function() {
    });

    it('getPost: Retorna um Post com ID igual ao do argumento', async function () {

        const post1 = {
            "postId": "2",
            "content": "New Post",
            "date": "15 January 2022",
            "userId": "Joao",
            "likes": 0,
            "dislikes": 0,
            "comments": [],
            "tags": []
        };

        const post = PostMap.toDomain(post1);

        let postRepoClass = require(config.repos.post.path).default;
        let postRepoInstance = Container.get(postRepoClass);
        Container.set(config.repos.post.name, postRepoInstance);
        postRepoInstance = Container.get(config.repos.post.name);
        
        // @ts-ignore
        sinon.stub(postRepoInstance, "getPost").returns(post) ;

        const serv = new PostService(postRepoInstance as IPostRepo);

        const res = await serv.getPost("2");
        const resDomain = PostMap.toDomain(res.getValue);
        sinon.assert.match(resDomain.props,(await post).props);
    });

    it('createPost: Retorna o Dto do post criado', async function () {

        const post1 = {
            "postId": "2",
            "content": "New Post",
            "date": "15 January 2022",
            "userId": "Joao",
            "likes": 0,
            "dislikes": 0,
            "comments": [],
            "tags": []
        };

        const post = PostMap.toDomain(post1);
        const postDto = PostMap.toDTO(post);

        let postRepoClass = require(config.repos.post.path).default;
        let postRepoInstance = Container.get(postRepoClass);
        Container.set(config.repos.post.name, postRepoInstance);
        postRepoInstance = Container.get(config.repos.post.name);

        // @ts-ignore
        sinon.stub(postRepoInstance, "createPost").returns(post) ;

        const serv = new PostService(postRepoInstance as IPostRepo);

        const res = await serv.createPost(postDto);
        sinon.assert.match(res.getValue(),(await postDto));
    });

    it('deletePost: Retorna o Dto do post apagado', async function () {

        const post1 = {
            "postId": "2",
            "content": "New Post",
            "date": "15 January 2022",
            "userId": "Joao",
            "likes": 0,
            "dislikes": 0,
            "comments": [],
            "tags": []
        };

        const post = PostMap.toDomain(post1);
        const postDto = PostMap.toDTO(post);

        let postRepoClass = require(config.repos.post.path).default;
        let postRepoInstance = Container.get(postRepoClass);
        Container.set(config.repos.post.name, postRepoInstance);
        postRepoInstance = Container.get(config.repos.post.name);

        // @ts-ignore
        sinon.stub(postRepoInstance, "removePostsOfUser").returns(post) ;

        const serv = new PostService(postRepoInstance as IPostRepo);

        const res = await serv.removePostsOfUser(postDto);
        sinon.assert.match(res.getValue(),(await postDto));
    });

    it('like: Retorna o Dto do post com a nova quantidade de likes', async function () {

        const post1 = {
            "postId": "2",
            "content": "New Post",
            "date": "15 January 2022",
            "userId": "Joao",
            "likes": 1,
            "dislikes": 0,
            "comments": [],
            "tags": []
        };

        const post = PostMap.toDomain(post1);
        const postDto = PostMap.toDTO(post);

        let postRepoClass = require(config.repos.post.path).default;
        let postRepoInstance = Container.get(postRepoClass);
        Container.set(config.repos.post.name, postRepoInstance);
        postRepoInstance = Container.get(config.repos.post.name);

        // @ts-ignore
        sinon.stub(postRepoInstance, "like").returns(post) ;

        const serv = new PostService(postRepoInstance as IPostRepo);

        const res = await serv.like(postDto);
        sinon.assert.match(res.getValue().likes,(await postDto).likes);
    });

    it('makeComment: Retorna o Dto do post com o novo comentario', async function () {

        const post1 = {
            "postId": "2",
            "content": "New Post",
            "date": "15 January 2022",
            "userId": "Joao",
            "likes": 1,
            "dislikes": 0,
            "comments": [{"commentContent": "Funciona", "commentDate": "15 January 2022", "commentUserId": "PP"}],
            "tags": []
        };

        const post = PostMap.toDomain(post1);
        const postDto = PostMap.toDTO(post);

        let postRepoClass = require(config.repos.post.path).default;
        let postRepoInstance = Container.get(postRepoClass);
        Container.set(config.repos.post.name, postRepoInstance);
        postRepoInstance = Container.get(config.repos.post.name);

        // @ts-ignore
        sinon.stub(postRepoInstance, "makeComment").returns(post) ;

        const serv = new PostService(postRepoInstance as IPostRepo);

        const res = await serv.makeComment(postDto);
        sinon.assert.match(res.getValue().comments,(await postDto).comments);
    });
    
});