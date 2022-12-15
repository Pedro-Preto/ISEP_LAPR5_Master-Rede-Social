import { Request, Response, NextFunction } from 'express';

export default interface IPostController  {
    createPost(req: Request, res: Response, next: NextFunction);
    updatePost(req: Request, res: Response, next: NextFunction);
    getPost(req: Request, res: Response, next: NextFunction);
    getAll(req: Request, res: Response, next: NextFunction);
    makeComment(req: Request, res: Response, next: NextFunction);
    like(req: Request, res: Response, next: NextFunction);
    dislike(req: Request, res: Response, next: NextFunction);
    deletePosts(req: Request, res: Response, next: NextFunction)
}