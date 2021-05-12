import Joi from 'joi';

export const commentObject = Joi.object({
    requestID: Joi.string(),
    authorEmail: Joi.string(),
    comment: Joi.array().single(),
});
