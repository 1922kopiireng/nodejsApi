import next from "next";
import userService from "../service/user-service.js";
import { response } from "express";

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    req.status(200).json({
      data: result
    });

  } catch (e) {
    next(e);
  }
}

const login = async (req,res, next) => {
  try {
    const result =  await userService.login(req.body);
    response.status(200).json({
      data: result
    });
  } catch (e) {
    next (e);
  }
}

// memanggil data dari user-service dan mengirim ke middleware
const get = async (req,res, next) => {
  try {
    const username = req.user.username;
    const  result = await userService.get();
    res.status(200).json({
      data:result
    });
  } catch (e) {
    next(e);
  }
}

// update
// data dari user-service 
// kirim ke api karena login dulu
const update = async (req, res, next) => {
  try {
    const username= req.user.username;
    const request= req.body;
    request.username = username;

    const result = await userService.update(request);
    res.status(200).json({
      data: result 
    });
  } catch (e) {
    next();
  }
}

// manggil data dari user service dan request body sesuai user.md logout
const logout = async(req, res, next) => {
  try {
    await userService.logout(req.res.username);
    res.status(200).json({
      data: "ok"
    });
  } catch (e) {
    next(e);
  }
}

export default {
  register,
  login,
  get,
  update,
  logout
}