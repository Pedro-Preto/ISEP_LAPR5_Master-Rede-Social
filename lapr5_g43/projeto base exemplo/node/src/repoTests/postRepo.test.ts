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


var mongoose = require ("mongoose");
var mongodb = "mongodb+srv://mongo:mongo123@lapr5g43dbpost.yuljf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(mongodb);
var postRepo = new PostRepo(postSchema);

let postJson = {
    "postId": "2",
    "content": "New Post",
    "date": "15 January 2022",
    "userId": "Joao",
    "likes": 0,
    "dislikes": 0,
    "comments": [],
    "tags": []
};

describe('new post', () => {

    it('should insert in db', async () => {
        const postOrError = await PostMap.toDomain(postJson);
        await postRepo.remove(postOrError);
        
        const returned = await postRepo.save(postOrError);

        expect(postOrError.props.postId).to.deep.equal(returned.props.postId);
        
        await postRepo.remove(postOrError);
    });
});

describe('like post', () => {

    it('should update likes', async () => {
        const postOrError = await PostMap.toDomain(postJson);
        await postRepo.remove(postOrError);

        const returned = await postRepo.save(postOrError);
        expect(postOrError.props.postId).to.deep.equal(returned.props.postId);

        postOrError.props.likes = 1;
        const postOrErrorUpdatedLikes = postOrError;

        const returnedUpdatedLikes = await postRepo.updateLikes(postOrErrorUpdatedLikes);
        expect(postOrErrorUpdatedLikes.props.likes).to.deep.equal(returnedUpdatedLikes.props.likes);

        await postRepo.remove(postOrError);
        await postRepo.remove(postOrErrorUpdatedLikes);
    });
});


describe('comment on post', () => {

    it('should update comments', async () => {
        const postOrError = await PostMap.toDomain(postJson);
        await postRepo.remove(postOrError);

        const returned = await postRepo.save(postOrError);
        expect(postOrError.props.postId).to.deep.equal(returned.props.postId);
        
        let postJsonWithNewComment = {
            "postId": "2",
            "content": "New Post",
            "date": "15 January 2022",
            "userId": "Joao",
            "likes": 0,
            "dislikes": 0,
            "comments": [{"commentContent": "Funciona", "commentDate": "15 January 2022", "commentUserId": "PP"}],
            "tags": []
        };
        
        const postOrErrorNewComment = await PostMap.toDomain(postJsonWithNewComment);

        const returnedNewComment = await postRepo.updateComment(postOrErrorNewComment);
        expect(postOrErrorNewComment.props.comments).to.deep.equal(returnedNewComment.props.comments);

        await postRepo.remove(postOrError);
        await postRepo.remove(postOrErrorNewComment);
    });
});