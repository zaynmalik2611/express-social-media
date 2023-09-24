import Joi from "joi";
const ValidatorSchemas = {
  Post: Joi.object({
    title: Joi.string().min(3).required(),
    body: Joi.string().min(3).required(),
  }),
};
export default ValidatorSchemas;
