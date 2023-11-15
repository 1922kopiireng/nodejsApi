import { validate } from "../validation/validation.js"
import { prismaClient } from "../application/database"
import { getContactValidation } from "../validation/contact-validation"
import { ResponseError } from "../error/response-error";
import { createAddressValidation, getAddressValidation } from "../validation/address-validation.js";


const checkContactMustExists =  async(user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const totalContactInDatabase = await prismaClient.contact.findFirst({
    where: {
      username: user.username,
      id: contactId
    }
  });

  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  return contactId;
}

// kirim ke controller
const create = async(user, contactId, request)=> {
  
  contactId = await checkContactMustExists(user, contactId); //ngambil data dari atas 

  request = validate(createAddressValidation, request);
  address.contact_Id = contactId;

  return prismaClient.address.create({
    data: address,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true
    }
  });

}

// kirim ke address kontroller
const get = async (user,  contactId, addressId) => {
  contactId = await checkContactMustExists(user, contactId);
  addressId = validate(getAddressValidation, addressId);

  const address = await prismaClient.address.findFirst({
    where: {
      contact_id: contactId,
      id: addressId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true
    }, 
  });
  if (!address) {
    throw new ResponseError(404, "address is not found");
  }
  return address;
}

const update = async (user, contactId, request) => {
  contactId = await checkContactMustExists(user, contactId);
  const address= validate(updateAddressValidation, request);

  // cek data addres yg mau diupdate
  const totalAddressInDatabase = await prismaClient.address.count({
    where: {
      contact_id: contactId,
      id: address.id 
    }

  });

  if (totalAddressInDatabase !== 1) {
    throw new  ResponseError(404, "address is not  found")
  }

  return prismaClient.address.updateMany({
    where: {
      contact_id: contactId,
      id: address.id
    },
    data:{
      street: address.street,
      city: address.city,
      province: address.province,
      country: address.country,
      postal_code: address.postal_code
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true
    }


  })
}

// dikirim ke kontroller
const remove = async (user,contactId, addressId) => {
  // validasi kontak id
  contactId = await checkContactMustExists(user, contactId);
  addressId = validate(getAddressValidation, addressId);

  // cek data addres yg mau diupdate
  const totalAddressInDatabase = await prismaClient.address.count({
    where: {
      contact_id: contactId,
      id: address.id 
    }

  });

  if (totalAddressInDatabase !== 1) {
    throw new  ResponseError(404, "address is not  found")
  }

  return prismaClient.address.delete({
    where: {
      id: addressId
    }
  });
}

// list kirim ke controller
const list =  async (user, contactId) => {
  contactId = await checkContactMustExists(user, contactId);

  return prismaClient.address.findMany({
    where: {
      contact_id: contactId
    },
    select: {
      id:true,
      street:true,
      city:true,
      province:true,
      country:true,
      postal_code:true
    }
  });
}

export default {
  create,
  get,
  update,
  remove,
  list
}