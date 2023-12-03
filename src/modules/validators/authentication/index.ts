import * as Joi from 'joi';

export const authenticationValidation = Joi.object({
  username: Joi.string().required().messages({
    'string.pattern.base': `username is a string.`,
  }),

  password: Joi.number().required().messages({
    'string.pattern.base': `username is a string.`,
  }),
});
