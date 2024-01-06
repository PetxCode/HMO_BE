import joi from "joi";

let regex =
  /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;

export const registerValidator = joi.object({
  email: joi.string().email().required(),
});

export const passwordValidator = joi.object({
  password: joi.string().pattern(new RegExp(regex)).required(),
  confirm: joi.ref("password"),
});
