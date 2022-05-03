import Joi from "joi";

const createTestSchema = Joi.object({
  name: Joi.string().required(),
  pdfUrl: Joi.string().required(),
  categoryId: Joi.number().required(),
  disciplineId: Joi.number().required(),
  teacherId: Joi.number().required(),
  views: Joi.number().required(),
});

export default createTestSchema;