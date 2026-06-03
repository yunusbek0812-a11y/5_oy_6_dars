const joi = require("joi");

const registerValidator = (data) => {
  const schema = joi.object({
    username: joi.string().min(3).required().messages(),
    email: joi.string().email().required().messages(),
    password: joi.string().min(6).required().messages(),
  });

  const { error } = schema.validate(data);
  return error || null;
};

// Login uchun validator
const loginValidator = (data) => {
  const schema = joi.object({
    username: joi.string().required().messages(),
    password: joi.string().required().messages(),
  });

  const { error } = schema.validate(data);
  return error || null;
};

module.exports = { registerValidator, loginValidator };
