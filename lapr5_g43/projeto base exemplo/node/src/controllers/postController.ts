import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPostController from "./IControllers/IPostController";
import IPostService from '../services/IServices/IPostService';
import IPostDTO from '../domain/dto/IPostDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class PostController implements IPostController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.post.name) private postServiceInstance: IPostService
    ) { }

    public async createPost(req: Request, res: Response, next: NextFunction) {
        try {
            const postOrError = await this.postServiceInstance.createPost(req.body as IPostDTO) as Result<IPostDTO>;

            if (postOrError.isFailure) {
                return res.status(402).send();
            }

            const postDTO = postOrError.getValue();
            console.log(postDTO);
            return res.json(postDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    };

    public async getPost(req: Request, res: Response, next: NextFunction) {
        try {
            const postOrError = await this.postServiceInstance.getPost(req.params) as Result<IPostDTO>;
            console.log("Entrei no controller e passei o service, o meu valor é");
            console.log(postOrError);
            if (postOrError.isFailure) {
                return res.status(404).send();
            }

            const postDTO = postOrError.getValue();
            return res.status(201).json(postDTO);
        }
        catch (e) {
            return next(e);
        }

    };
    public async deletePosts(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body)
            const postOrError = await this.postServiceInstance.removePostsOfUser(req.body) as Result<IPostDTO>;

            if (postOrError.isFailure) {
                return res.status(404).send();
            }

            const postDTO = postOrError.getValue();
            return res.status(201).json(postDTO);
        }
        catch (e) {
            return next(e);
        }

    };
    public async makeComment(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body)
            const postOrError = await this.postServiceInstance.makeComment(req.body) as Result<IPostDTO>;
           
            if (postOrError.isFailure) {
                return res.status(404).send();
            }

            const postDTO = postOrError.getValue();
            return res.status(201).json(postDTO);
        }
        catch (e) {
            return next(e);
        }

    };
    public async like(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body)
            const postOrError = await this.postServiceInstance.like(req.body) as Result<IPostDTO>;

            if (postOrError.isFailure) {
                return res.status(404).send();
            }

            const postDTO = postOrError.getValue();
            return res.status(201).json(postDTO);
        }
        catch (e) {
            return next(e);
        }

    };
    public async dislike(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body)
            const postOrError = await this.postServiceInstance.dislike(req.body) as Result<IPostDTO>;

            if (postOrError.isFailure) {
                return res.status(404).send();
            }

            const postDTO = postOrError.getValue();
            return res.status(201).json(postDTO);
        }
        catch (e) {
            return next(e);
        }

    };

    public async updatePost(req: Request, res: Response, next: NextFunction) {
        try {
            const postOrError = await this.postServiceInstance.updatePost(req.body as IPostDTO) as Result<IPostDTO>;

            if (postOrError.isFailure) {
                return res.status(404).send();
            }

            const postDTO = postOrError.getValue();
            return res.status(201).json(postDTO);
        }
        catch (e) {
            return next(e);
        }
    };

    public async getAll(req, res, next) {

        try {
            var allPosts= await this.postServiceInstance.getAll();
            if (!allPosts) {
                return res.status(402).send();
            }
            
            return res.status(201).send(allPosts);
        } catch (e) {
            console.log(e);
            return res.status(400).send();
        }
    }
    
}