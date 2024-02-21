import joi from "joi";

export const importTaskSchema = joi.object({
  _id: joi.string().required(),
  type: joi.string().valid("story", "bug").required(),
  title: joi.string().required(),
  timeSpent: joi.number().required(),
  timeInterval: joi.string().valid("seconds", "minutes", "hours").required(),
  body: joi.string().required(),
  tags: joi.array().items(joi.string()).required(),
  shortCode: joi.number().required(),
  dateStarted: joi.string().required(),
  createdBy: joi.object({
    avatar: joi.string().allow(null),
    name: joi.string().required(),
    email: joi.string().required()
  }).required(),
  createdAt: joi.string().required(),
  updatedAt: joi.string().required(),
  dateFinished: joi.string().required()
});

