import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPostController from '../../controllers/IControllers/IPostController';

import config from "../../../config";

const route = Router();
const routeGetAll = Router();
const routeMakeComment = Router();
const routeLike = Router();
const routeDislike = Router();
const routeRemovePost = Router();

export default (app: Router) => {
  app.use('/posts', route);
  app.use('/allPosts',routeGetAll);
  app.use('/makeComment',routeMakeComment);
  app.use('/like',routeLike);
  app.use('/dislike',routeDislike);
  app.use('/removePost',routeRemovePost);

  const ctrl = Container.get(config.controllers.post.name) as IPostController;

  route.post('',
    celebrate({
      body: Joi.object({
          postId:Joi.string().required(),
        content: Joi.string().required(),
        date: Joi.string().required(),
        userId: Joi.string().required(),
        likes: Joi.number().required(),
        dislikes: Joi.number().required(),
        comments: Joi.array().items(
          Joi.object({
            commentId: Joi.string(),
            commentContent: Joi.string(),
            commentDate: Joi.string(),
            commentUserId: Joi.string()
          })),
          tags: Joi.array().items(
              Joi.object({
                  tag: Joi.string(),
              }))
      })
    }),
    (req, res, next) => ctrl.createPost(req, res, next));

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        content: Joi.string().required(),
        date: Joi.string().required(),
        userId: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.updatePost(req, res, next));

  route.get('/:id',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        content: Joi.string().required(),
        date: Joi.string().required(),
        userId: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.getPost(req, res, next));

    routeGetAll.get('',
        (req, res,err) => ctrl.getAll(req,res,err));
    
routeMakeComment.put('',
    celebrate({
        body: Joi.object({
            postId:Joi.string().required(),
            content: Joi.string().required(),
            date: Joi.string().required(),
            userId: Joi.string().required(),
            likes: Joi.number().required(),
            dislikes: Joi.number().required(),
            comments: Joi.array().items(
                Joi.object({
                    commentId: Joi.string(),
                    commentContent: Joi.string(),
                    commentDate: Joi.string(),
                    commentUserId: Joi.string()
                })),
            tags: Joi.array().items(
                Joi.object({
                    tag: Joi.string(),
                }))
        })
    }), (req, res, next) => ctrl.makeComment(req, res, next));


    routeLike.put('',
        celebrate({
            body: Joi.object({
                postId:Joi.string().required(),
                content: Joi.string().required(),
                date: Joi.string().required(),
                userId: Joi.string().required(),
                likes: Joi.number().required(),
                dislikes: Joi.number().required(),
                comments: Joi.array().items(
                    Joi.object({
                        commentId: Joi.string(),
                        commentContent: Joi.string(),
                        commentDate: Joi.string(),
                        commentUserId: Joi.string()
                    })),
                tags: Joi.array().items(
                    Joi.object({
                        tag: Joi.string(),
                    }))
            })
        }),  (req, res, next) => ctrl.like(req, res, next));

    routeDislike.put('',
        celebrate({
            body: Joi.object({
                postId:Joi.string().required(),
                content: Joi.string().required(),
                date: Joi.string().required(),
                userId: Joi.string().required(),
                likes: Joi.number().required(),
                dislikes: Joi.number().required(),
                comments: Joi.array().items(
                    Joi.object({
                        commentId: Joi.string(),
                        commentContent: Joi.string(),
                        commentDate: Joi.string(),
                        commentUserId: Joi.string()
                    })),
                tags: Joi.array().items(
                    Joi.object({
                        tag: Joi.string(),
                    }))
            })
        }), (req, res, next) => ctrl.dislike(req, res, next));
    
    routeRemovePost.put('',
        celebrate({
            body: Joi.object({
                postId:Joi.string().required(),
                content: Joi.string().required(),
                date: Joi.string().required(),
                userId: Joi.string().required(),
                likes: Joi.number().required(),
                dislikes: Joi.number().required(),
                comments: Joi.array().items(
                    Joi.object({
                        commentId: Joi.string(),
                        commentContent: Joi.string(),
                        commentDate: Joi.string(),
                        commentUserId: Joi.string()
                    })),
                tags: Joi.array().items(
                    Joi.object({
                        tag: Joi.string(),
                    }))
            })
        }),    (req, res, next) => ctrl.deletePosts(req, res, next));
};