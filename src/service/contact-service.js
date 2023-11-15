import { request } from "express";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getContactValidation, searchContactValidation, updateContactValidation } from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js"

// service create contact dikirim ke controller
const create = async (user, request) => {
  const create = validate(creatContactValidation, request);
  contact.username = user.username;

  // kalau sudah valid
  return prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true
    }
  });
}

// ngambil data dari contact dan dikirim ke controler
const get = async  (user, contactId) => {
  contactId =  validate(getContactValidation, contactId);
  
  const contact = await prismaClient.contact.findFirst({
    where: {
      username: user.username,
      id: contactId
    },
    select:{
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    }
  });

  if (!contact) {
    throw new ResponseError(404, "contact is not found");
  }

  return contact;
}

// baca data db dan dicocokan ada tidak, kalau ada di ambil dan dikirim ke controller
const update = async (user, request) => {
  const contact = validate(updateContactValidation, request);

  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contact.id
    }
  });
  if (totalContactInDatabase != 1) {
    throw new ResponseError(404, "contact is not found");
  }

  return prismaClient.contact.update({
    where: {
      id: contact.id
    },
    data:{
      first_name: contact.first_name, 
      last_name: contact.last_name, 
      email: contact.email, 
      phone: contact.phone, 
    },
    select:{
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    }
  })
}

// 
const remove = async (user, contactId) => {
  contactId =  validate(getContactValidation, contactId);

  const totalInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId
    }
  });
  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  return prismaClient.contact.delete({
    where: {
      id: contactId
    }
  });
}

// mengirim data ke kontak controller
const search =  async (user, request) => {
  request  = validate(searchContactValidation,  request);

  // 1 ((page - 1) * size) = 0
  // 2 ((page - 1) * size) = 10
  const skip =  (request.page - 1 ) * request.size;
  
  const filter = []; 

  fiters.push({
    username: user.username
  })

  if (request.name) {
    fiters.push({
            OR: [
              {
                first_name: {
                  contains: request.name,
                }
              },
              {
                last_name: {
                  contains: request.name,
                }
              }

            ]
    });
  }
  if (request.email) {
    filter.push({
            email: {
              contains: request.email
            }
    }); 
  }
  if (request.phone) {
    filter.push({
            phone: {
              contains: request.phone
            }
    });
  }

  const contacts = await prismaClient.contact.findMany({
      where: {
        AND: filters
      },
      take: request.size,
      skip: skip 
  });

  const totalItems = await prismaClient.contact.count({
    where: {
      AND: filters
    }
  });

  return {
    data: contacts,
    paging: {
      page: request.page,
      totalItem: totalItems,
      total_page: Math.ceil(totalItems / request.size)
    }
  }
}


export default {
  create,
  get,
  update,
  remove
}