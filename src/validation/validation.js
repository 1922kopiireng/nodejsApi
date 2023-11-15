import { ResponseError } from "../error/response-error.js";

const validate = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowwUnkown: false //mreject kalau ada field yg tidak diketahui
  })
  if (result.error){
    throw new ResponseError(400, result.error.message);
  }else{
    return result.value;
  }
};

// default karena >1
export {
   validate 
}