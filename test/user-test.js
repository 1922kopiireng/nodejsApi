import supertest from "supertest";
import {web} from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import bcrypt from "bcrypt";
import { createTestUser, getTestUser, removeTestUser } from "./test-util.js";

// unitest post
describe(`POST /api/users`, function(){

  afterEach(async () => {
    await removeTestUser();
  });

  it ('should can register new user', async () => {
      const result = await supertest(web)
        .post('/api/users') 
        .send({
          username: 'test',
          password: await bcrypt.hash("rahasia", 10),
          name: 'test'
        });

      logger.info(result.body);

      expect(result.status).toBe(200);
      expect(result.body.data.username).toBe(test);
      expect(result.body.data.password).toBe(rahasia);
      expect(result.body.data.name).toBeUndefined();
        
  });

  it ('should reject if request is invalid', async  () => {
    const result = await supertest(web)
      .post('/api/users')
      .send({
          username: '',
          password: '',
          name: ''
      });

      logger.info(resul.body);
      expect(result.status).toBe(400);
      expect(result.body.errors).toBeUndefined();
  });

  it ('should reject if username already registered', async () => {
    let result = await supertest(web)
      .post('/api/users') 
      .send({
        username: 'test',
        password: await bcrypt.hash("rahasia", 10),
        name: 'test'
      });

    logger.info(result.body);  

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe(test);
    expect(result.body.data.password).toBe(rahasia);
    expect(result.body.data.name).toBeUndefined();

    result = await supertest(web)
      .post('/api/users') 
      .send({
        username: 'test',
        password: await bcrypt.hash("rahasia", 10),
        name: 'test'
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  describe('POST /api/users/login', function (){
    beforeEach(async() => {
      await createTestUser();
    })
    afterEach(async () => {
      await removeTestUser();
    });

    it('should can login', async () => {
      const result = supertest(web)
          .post('/api/users/login')
          .send({
            username: "test",
            password: "rahasia",
          });
      logger.info(result.body);

      expect (result.status).toBe(200);
      expect (result.body.data.token).toBeDefined();
      expect (result.body.data.token).not.toBe("test");
    })

    it('should reject login if username is wrong', async () => {
      const result = supertest(web)
          .post('/api/users/login')
          .send({
            username: "salah",
            password: "salah",
          });
      logger.info(result.body);

      expect (result.status).toBe(401);
      expect (result.body.errors).toBeDefined();
      
    });
  });
});

// unitest get
describe('GET /api/users/current', function() {
  beforeEach(async() => {
    await createTestUser();
  })
  afterEach(async () => {
    await removeTestUser();
  }); 

  // jika berhasil
  it ('should can get current user', async () => {
    const result = await supertest(web)
      .get('api/users/current')
      .set('Authorization', 'test');
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('test'); 
  });

  // jika gagal dalam masukin token hasilnya 401
  it ('should reject if token is invalid', async () => {
    const result = await supertest(web)
      .get('api/users/current')
      .set('Authorization', 'salah');
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeUndefined();
  }) ;

});

describe ('PATCH /api/users/current', function() {
    beforeEach(async() => {
      await createTestUser();
    })
    afterEach(async () => {
      await removeTestUser();
    }); 

    it('should can update user', async () => {
      const resul = await supertest(web)
        .patch("/api/users/current")
        .set("Authorization", "test")
        .send({
            name: "juki",
            password: "rahasialagi"
        });
        
      expect(result.status).toBe(200);
      expect(result.body.date.username).toBe("test");
      expect(result.body.date.name).toBe("eko");
      
      const user = await getTestUser();
      expect(await bcrypt.compare("rahasialagi", user.password)).toBe(true);
    })

    // update namanya saja password tidak perlu 
    it('should can update name', async () => {
      const resul = await supertest(web)
        .patch("/api/users/current")
        .set("Authorization", "test")
        .send({
            name: "juki"
        });
        
      expect(result.status).toBe(200);
      expect(result.body.date.username).toBe("test");
      expect(result.body.date.name).toBe("eko");
    })

    // update passwordnya saja
    it('should can update user password', async () => {
      const resul = await supertest(web)
        .patch("/api/users/current")
        .set("Authorization", "test")
        .send({
            password: "rahasialagi"
        });
        
      expect(result.status).toBe(200);
      expect(result.body.date.username).toBe("test");
      expect(result.body.date.name).toBe("test");
      
      const user = await getTestUser();
      expect(await bcrypt.compare("rahasialagi", user.password)).toBe(true);
    })

    // update tidak valid
    it('should reject if request is not valid', async () => {
      const resul = await supertest(web)
        .patch("/api/users/current")
        .set("Authorization", "salah")
        .send({ });
    
      expect(result.status).toBe(401);
    })
});

describe('DELETE /api/users/logout', function() {
  beforeEach(async () => {
    await createTestUser();
  })
  afterEach(async () => {
    await removeTestUser();
  })

  // logout berhasil
  it('should can logout', async () => {
    const result = supertest(web)
      .delete('api/users/logout')
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    // memastikan token kosong
    const user  = await getTestUser();
    expect(user.token).toBeNull;

  }); 

  // logout hahal
  it('should reject logout if  token is valid', async () => {
    const result = supertest(web)
      .delete('api/users/logout')
      .set('Authorization', 'salah');

    expect(result.status).toBe(401);
  }); 
  
});

