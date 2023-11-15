import express from "express";
import userController from "../controller/user-controller.js";

// router u/ yg belum login
const publicRouter =  new express.Router();
publicRouter.post('/api/users', userController.register);
publicRouter.post('/api/user/login', userController.login);

export {
  publicRouter
};