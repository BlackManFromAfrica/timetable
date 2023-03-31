import { body } from "express-validator";

export const registerValidation = [
  body("fullName", "Фио должно быть минимум 10 символа").isLength({ min: 10 }),
  body("password", "пароль должен быть минимум 5 символов").isLength({
    min: 5,
  })

];

export const teacherCreateValidation = [
  body("fullName", "Фио должно быть минимум 10 символа").isLength({ min: 10 }),
];
export const loginValidation = [
  body("fullName", "Имя должно быть минимум 10 символа").isLength({ min: 3 }),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
  }),
];
export const updateUserValidation = [
  body("groupName", "Выберите группу").isString(),
];
export const timetableCreateValidation = [
  body("date", "Дата не определена").isLength({ min: 3 }).isString(),
  body("groups", "Данные не определены").isArray().notEmpty(),
  body("groupNames", "Не удалось создать общее мероприятие"),
];
export const timetableUpdateValidation = [
  body("classes", "Данные не определены").isArray().notEmpty(),
];
