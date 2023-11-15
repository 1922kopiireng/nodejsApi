import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

// mengirimkan hapus data user  ke file user-test.js
export const removeTestUser = async  ()  => {
  await prismaClient.user.deleteMany({
    where: {
      username: 'test' 
    }
  })
}

// membuat user dikirim ke user-test
export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      name: "test",
      token: "test"
    }
  })
}

export const getTestUser =  async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test"
    }
  });
}

// menghapus test kontak kalau semua sudah dijalankan
export const removeAllTestContact = async () => {
  await prismaClient.contact.deleteMany({
    where: {
      username: 'test'
    }
  });
}

// contact test
export const createTestContact = async () => {
  await prismaClient.contact.create({
    data: {
      username: "test",
      first_name: "test",
      last_name: "test",
      email: "test@pzn.com",
      phone: "085324353478"
    }
  });
}
// 
export const createManyTestContact = async () => {
  for(let i = 0; i <15; i++ ){
    await prismaClient.contact.create({
      data: {
        username: `test ${i}`,
        first_name: `test ${i}`,
        last_name: `test ${i}`,
        email: `test${i}@pzn.com`,
        phone: `085324353478`,
      }
    })
  }
}

// mengirim ke contact-test
export const getTestContact = async () => {
  return  prismaClient.contact.findFirst({
    where:{
      username: 'test'
    }
  });
}

export const removeAllTestAddresses = async() => {
  await prismaClient.address.deleteMany({
    where: {
      contact: {
        username: "test"
      }
    }
  })
}

export const createTestAddress = async () => {
  const contact =  await getTestContact()
  await prismaClient.address.create({
    data: {
      contact_id: contact_id,
      street: "jalan test",
        city: "kota test",
        province: "provinsi test",
        country: "",
        postal_code: ""
    }
  })
}

export const getTesAddress = async () => {
  return prismaClient.address.findFirst({
    where: {
      contact: {
        username: "test"
      }  
    }
  })
}
