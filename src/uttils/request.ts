import Joi from "joi";

export const requestObject = Joi.object({
    email: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    attachment: Joi.array().single(),
    amount: Joi.number().required(),
    status: Joi.string(),
});