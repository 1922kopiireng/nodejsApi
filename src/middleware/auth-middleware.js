import { prismaClient } from "../application/database";

// mengambil data dari controller 
export const authMiddleware = async (res,req, next) => {
  const token = req.get('Authorization');
  if (!token) {
    res.status(401).json({
      errors: "Unauthorized"
    }).end();
  }else{
    const user= await prismaClient.user.findUnique({
      where: {
        token: token
      }
    });
    if (!user) {
      res.status(401).json({
        errors: "Unauthorized"
      }).end();
    }else{
      req.user = user;
      next();
    }
  }
}