import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { contactController } from "../controller/contact-controller.js";
import { addressController } from "../controller/address-controller.js";

// router u/ yg sudah login
// semua di route harus melalui auth middleware
// dari kontroller
const userRouter =  new express.Router();
userRouter.use(authMiddleware); 

// User API

userRouter.get('/api/user/current', userController.get);
userRouter.patch('/api/user/current', userController.update); 
userRouter.delete('/api/user/logout', userController.logout); 

// Contact API
userRouter.post('/api/contacts', contactController.create);
userRouter.get('/api/contacts/:contactId', contactController.get);
userRouter.put('/api/contacts/:contactId', contactController.update);
userRouter.get('/api/contacts', contactController.search);

// Address API
userRouter.post('/api/contacts/:contact_Id/addresses', addressController.create);
userRouter.get('/api/contacts/:contact_Id/addresses/:addressId', addressController.get);
userRouter.put('/api/contacts/:contact_Id/addresses/:addressId', addressController.update); 
userRouter.remove('/api/contacts/:contact_Id/addresses/:addressId', addressController.remove); 
userRouter.get('/api/contacts/:contact_Id/addresses', addressController.list); 

export {
  userRouter
};