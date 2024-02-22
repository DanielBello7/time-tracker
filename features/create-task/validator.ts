import joi from "joi";

export const createTaskValidator = joi.object({
  type: joi.string().valid("story", "bug").min(1).trim().empty(false).required(),
  title: joi.string().min(1).trim().empty(false).required(),
  timeSpent: joi.number().min(1).required(),
  timeInterval: joi.string().valid("seconds", "minutes", "hours").trim().min(1).empty(false).required(),
  body: joi.string().min(1).trim().empty(false).required(),
  tags: joi.array().items(joi.string().trim().min(1).empty(false)).min(2).required(),
  dateStarted: joi.string().min(1).trim().empty(false).required(),
  dateFinished: joi.string().min(1).trim().empty(false).required()
});

