const joi = require("joi");

module.exports = function (data) {
  const schema = joi.object({
    title: joi.string().required(),
    author: joi.string().required(),
    description: joi.string().required(),
    period: joi.string().required(),
    genre: joi.string().required(),
    cover_url: joi.string().uri().optional().allow(""),
    rating: joi.number().min(0).max(5).optional(),
    price: joi.number().min(0).optional(),
    published_year: joi.number().integer().optional(),
    pages: joi.number().integer().min(0).optional(),
    is_available: joi.boolean().optional(),
  });

  return schema.validate(data);
};
