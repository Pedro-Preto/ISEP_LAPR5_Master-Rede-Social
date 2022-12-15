import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import config from "../../config";
import 'reflect-metadata';

import IPostController from '../controllers/IControllers/IPostController';
import IPostDTO from "../domain/dto/IPostDTO";

describe('post controller create', () => {

    it('createPost: returns IPostDTO', async function () {
        let body = {
            "postId": "2",
            "content": "New Post",
            "date": "15 January 2022",
            "userId": "Joao",
            "likes": 0,
            "dislikes": 0,
            "comments": [],
            "tags": []
        };
        let req: Partial<Request> = {};
        req.body = body;

        
        let postServiceClass = require(config.services.post.path).default;
        let postServiceInstance = Container.get(postServiceClass);
        Container.set(config.services.post.name, postServiceInstance);
        postServiceInstance = Container.get(config.services.post.name);
        
        let postControllerClass = require(config.controllers.post.path).default;
        let postControllerInstance: IPostController = Container.get(postControllerClass)
        Container.set(config.controllers.post.name, postControllerInstance);
        postControllerInstance = Container.get(config.controllers.post.name);
        

        beforeEach(() => {
            // @ts-ignore
            sinon.stub(postServiceInstance, "createPost").returns(({
                "postId": req.body.postId,
                "content": req.body.content,
                "date": req.body.date,
                "userId": req.body.userId,
                "likes": req.body.likes,
                "dislikes": req.body.dislikes,
                "comments": req.body.comments,
                "tags": req.body.tags
            }) as IPostDTO);
        });
        afterEach(function () {
            sinon.restore();
        });
        it('should create ', async () => {
            const jsonStub = sinon.stub()
            const res = { status: status => ({ json: jsonStub, send: err => err }) }
            const statusSpy = sinon.spy(res, 'status')

            // @ts-ignore
            await postControllerInstance.createPost(<Request>req, <Response>res);

            // @ts-ignore
            sinon.assert.calledWith(res.status, 201);
            sinon.assert.calledWith(jsonStub, {
                "postId": req.body.postId,
                "content": req.body.content,
                "date": req.body.date,
                "userId": req.body.userId,
                "likes": req.body.likes,
                "dislikes": req.body.dislikes,
                "comments": req.body.comments,
                "tags": req.body.tags
            });
        });
    });
});
