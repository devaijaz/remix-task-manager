import type { ObjectSchema, ValidationResult } from "joi";
import Joi from "joi";
import {z} from "zod";
import type { TaskPayload } from "~/types/index.server";

const taskSchema = Joi.object<any>({
  title: Joi.string().min(5).max(255).required().messages({
    'any.required': `title must be 5 chars long`,
    "string.empty": `title must be 5 chars long`,
  }),
  content: Joi.string().min(5).required(),
});

const authSchema = Joi.object<any>({
  mode: Joi.string().only().valid("login", "signup"),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(20).required(),
  fullname: Joi.alternatives().conditional("mode", {
    is: "signup",
    then: Joi.string().min(5).required(),
  }),
});

function validateSchema<T>(schema: ObjectSchema<T>, payload: T) {
  const validation = schema.validate(payload, {
    abortEarly: false,
  });
  throwError(validation);
}

export const validateTask = (task: TaskPayload) => {
  validateSchema(taskSchema, task);
};

export const validateAuthForm = (auth: any) => {
  validateSchema(authSchema, auth);
};

function throwError(validation: ValidationResult) {
  const errors  = {};
  validation.error?.details?.forEach((detail) => {
    errors[detail.path[0]] = detail.message;
  });
  if (Object.keys(errors).length) {
    throw errors;
  }
}
