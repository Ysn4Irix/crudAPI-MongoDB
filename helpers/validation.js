/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 24-08-2021
 * @modify date 20-09-2021
 * @desc [User Schema Validation]
 */

const joi = require("joi");

const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};

const validateInsert = (data) => {
  const schema = joi.object({
    fullname: joi.string().min(4).max(20).required(),
    username: joi.string().min(6).max(15).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(20).required(),
    ip: joi.string(),
  });
  return schema.validate(data, options);
};

const validateUpdate = (data) => {
  const schema = joi.object({
    fullname: joi.string().min(4).max(20),
    username: joi.string().min(6).max(15),
    email: joi.string().email(),
  });
  return schema.validate(data, options);
};

module.exports = {
  validateInsert,
  validateUpdate,
};
