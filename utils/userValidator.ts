import joi from "joi";

let regex =
  /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;

export const registerValidator = joi.object({
  email: joi.string().email().required(),
});

export const registerHospital = joi.object({
  email: joi.string().email().required(),
  hospitalName: joi.string().required(),
});

export const registerDoctor = joi.object({
  fullName: joi.string().required(),
});

export const registerMember = joi.object({
  firstName: joi.string().required(),
  relationship: joi.string().required(),
});

export const passwordValidator = joi.object({
  password: joi.string().pattern(new RegExp(regex)).required(),
  confirm: joi.ref("password"),
});
