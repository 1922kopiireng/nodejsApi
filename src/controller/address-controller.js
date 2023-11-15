import next from "next";
import addressService from "../service/address-service.js";

// mengirim data ke api
const create = async(req, req, next)=> {
  try {
    const user = req.user;
    const request = req.body;
    const contact_Id = req.params.contact_Id;

    const result = await addressService.create(user, contact_Id, request);

    res.status(200).json ({
      data: result
    });

  } catch (e) {
    next(e);
  }
}
 
// kirim ke api
const get =  async (user, res, next) => {
  try {
    const user = req.user;
    const contact_Id = req.params.contact_Id;
    const addressId = req.params.addressId;

    const result = await addressService.create(user, contact_Id, addressId);

    res.status(200).json ({
      data: result
    });
  } catch (e) {
    next(e);
  }
}

// kirim ke route api
const update = async(req, req, next)=> {
  try {
    const user = req.user;
    const contact_Id = req.params.contact_Id;
    const addressId = req.params.addressId; //ngambil data dari service
    const request = req.body;
    request.id =  addressId;
    

    const result = await addressService.update(user, contact_Id, request);

    res.status(200).json ({
      data: result
    });

  } catch (e) {
    next(e);
  }
}

// remove kirim ke api
const remove = async(req, req, next)=> {
  try {
    const user = req.user;
    const contact_Id = req.params.contact_Id;
    const addressId = req.params.addressId; //ngambil data dari service

    const result = await addressService.remove(user, contact_Id, addressId);

    res.status(200).json ({
      data: "OK"
    });

  } catch (e) {
    next(e);
  }
}

// kirim ke api
const list = async(req, req, next)=> {
  try {
    const user = req.user;
    const contact_Id = req.params.contact_Id;

    const result = await addressService.remove(user, contact_Id);

    res.status(200).json ({
      data: result
    });

  } catch (e) {
    next(e);
  }
}

export  default {
  create,
  get,
  update,
  remove,
  list
}