import express from "express";
import mongoose from "mongoose";
import {
  registerValidation,
  loginValidation,
  timetableCreateValidation,
  teacherCreateValidation,
  updateUserValidation,
} from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as TimetableController from "./controllers/TimetableController.js";
import * as UserController from "./controllers/UserController.js";
import * as TeacherController from "./controllers/TeacherController.js";
import * as GroupController from "./controllers/GroupController.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import cors from "cors";

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.ghsbmhm.mongodb.net/timetable?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Ok"))
  .catch((err) => console.log("db error", err));

const app = express();




app.use(express.json());
app.use(cors());
app.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.post(
  "/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);

app.get("/me", checkAuth, UserController.getMe);
app.patch(
  "/user/:id",
  checkAuth,
  updateUserValidation,
  handleValidationErrors,
  UserController.update
);
app.get("/user/:id", checkAuth, UserController.getOne);
app.get("/users", checkAuth, UserController.getAll);

app.get("/", TimetableController.getAll);
app.get("/:id", TimetableController.getOne);
app.post(
  "/",
  checkAuth,
  timetableCreateValidation,
  handleValidationErrors,
  TimetableController.create
);

app.get("/groups/all", GroupController.getAll);
app.get("/group/:id", GroupController.getOne);
app.post(
  "/group/create",
  checkAuth,
  handleValidationErrors,
  GroupController.create
);
app.patch("/group/:id", checkAuth,
  handleValidationErrors, GroupController.update);
app.delete("/group/:id", checkAuth, GroupController.remove);

app.get("/teachers/all", TeacherController.getAll);
app.get("/teacher/:id", TeacherController.getOne);
app.post(
  "/teacher/create",
  teacherCreateValidation,
  handleValidationErrors,
  TeacherController.create
);
app.patch("/teacher/:id", checkAuth, TeacherController.update);
app.delete("/teacher/:id", checkAuth, TeacherController.remove);

app.delete("/timetable/:id", checkAuth, TimetableController.remove);

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server Ok");
});
