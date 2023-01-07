import type { ObjectSchema, ValidationResult } from "joi";
import Joi from "joi";
import type { TaskPayload } from "~/types/index.server";

const taskSchema = Joi.object<any>({
  title: Joi.string().min(5).required(),
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
  console.log(validation);
  throwError(validation);
}

export const validateTask = (task: TaskPayload) => {
  validateSchema(taskSchema, task);
};

export const validateAuthForm = (auth: any) => {
  console.log(auth);
  validateSchema(authSchema, auth);
};

function throwError(validation: ValidationResult) {
  const messages = validation.error?.details?.map((detail) => detail.message);
  if (messages && messages.length) {
    throw messages;
  }
}
