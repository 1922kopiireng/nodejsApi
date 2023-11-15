import supertest from "supertest";
import { createTestContact, createTestUser, getTestContact, getTestUser, removeAllTestContact, removeTestUser } from "./test-util"

describe('POST /api/contacts', function(){
  beforeEach(async () => {
    await createTestUser();
  })

  afterEach(async() => {
    await removeAllTestContact();
    await removeTestUser();
  })

  // Validation berhasil
  it('should can create new contact', async() => {
    const result =  await supertest(web)
      .post('api/contacts')
      .set('Authorization', 'test')
      .send({
        first_name: "test",
        last_name: "test",
        email: "kopiireng@gmail.com",
        phone: "085324353478"
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeUndefined(); //auto incremen di db
    expect(result.body.data.first_name).toBe("test"); 
    expect(result.body.data.last_name).toBe("test"); 
    expect(result.body.data.email).toBe("kopiireng@gmail.com"); 
    expect(result.body.data.phone).toBe("085324353478");
  });

  // validation error
  it('should reject if request is not valid', async() => {
    const result =  await supertest(web)
      .post('api/contacts')
      .set('Authorization', 'test')
      .send({
        first_name: "test",
        last_name: "test",
        email: "test",
        phone: "0853243534782329482938592349204829342342524234"
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeUndefined();
  });

});

describe('GET /api/contacts/:contactId', function () {
  beforeEach(async() => {
    await createTestUser();
    await createTestContact();
  })

  afterEach(async() => {
    await removeAllTestContact();
    await createTestContact();
  })

  it('should can get contact', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contact" + testContact.id)
      .set('Authorization', 'test')
    
    //menyamakan data dari test kontak dan db 
    expect(result.status).toBe(200);  
    expect(result.body.data.id).toBe(testContact.id);  
    expect(result.body.data.first_name).toBe(testContact.first_name);  
    expect(result.body.data.last_name).toBe(testContact.last_name);  
    expect(result.body.data.email).toBe(testContact.email);  
    expect(result.body.data.phone).toBe(testContact.phone);  
  });

  it('should 404 if contact id is not found', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contact" + (testContact.id + 1))
      .set('Authorization', 'test')

    expect(result.status).toBe(404);        
  });
})

describe('PUT /api/contacts/:contactId', function () {
  beforeEach(async() => {
    await createTestUser();
    await createTestContact();
  })

  afterEach(async() => {
    await removeAllTestContact();
    await createTestContact();
  })

  // update contact berhasil
  it('should can update existing contact', async () =>{
    const testContact =  await getTestContact();

    const result =  await supertest(web)
      .put('api/contacts/' + testContact.id)
      .set('Authorization', 'test')
      .send({
        first_name: "Juki",
        last_name: "Kurniawan",
        email: "kopiireng@gmail.com",
        phone: "085324353478",
      });
    expect(result.status).toBe(200); 
    expect(result.body.data.id).toBe(testContact.id); 
    expect(result.body.data.first_name).toBe("Juki"); 
    expect(result.body.data.last_name).toBe("Kurniawan"); 
    expect(result.body.data.email).toBe("kopiireng@gmail.com"); 
    expect(result.body.data.phone).toBe("085324353478"); 
  })

  // update contact gagal
  it('should reject if request  is invalid', async () =>{
    const testContact =  await getTestContact();

    const result =  await supertest(web)
      .put('api/contacts/' + testContact.id)
      .set('Authorization', 'test')
      .send({
        first_name: "Juki",
        last_name: "Kurniawan",
        email: "kopiireng@gmail.com",
        phone: "085324353478",
      });
      
    expect(result.status).toBe(400); 
  })

  // update contact not found
  it('should reject if contact is not found', async () =>{
    const testContact =  await getTestContact();

    const result =  await supertest(web)
      .put('api/contacts/' + (testContact.id + 1))
      .set('Authorization', 'test')
      .send({
        first_name: "",
        last_name: "",
        email: "kopiireng",
        phone: "",
      });

    expect(result.status).toBe(404); 
  })
})

describe('DELETE /api/contacts/:contactId', function (){
  beforeEach(async() => {
    await createTestUser();
    await createTestContact();
  })

  afterEach(async() => {
    await removeAllTestContact();
    await createTestUser();
  })

  //hapus kontak berhasil
  it('should can delete contact', async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .delete('/api/' + testContact.id)
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testContact = await getTestContact();
    expect(testContact).toBeNull();

  })

  // hapus kontak gagal karena id tidak ada
  it('should reject if contact is not found', async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .delete('/api/' + (testContact.id + 1))
      .set('Authorization', 'test');

    expect(result.status).toBe(404);

  })
});

describe('', function (){
  beforeEach(async() => {
    await createTestUser();
    await createTestContact();
  })

  afterEach(async() => {
    await removeAllTestContact();
    await createTestContact();
  })

  // test search tanpa parameter
  it('should can search without parameter', async () => {
    const result = await supertest(web)
      .get('/api/contacts')
      .query({
        page: 2
      })
      .set('Authorization', 'test')

    logger.info(result.body); 
      
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  })

  // test search dengan nama
  it('should can search using name', async () => {
    const result = await supertest(web)
      .get('/api/contacts')
      .query({
        name:  "test 1"
      })
      .set('Authorization', 'test')

    logger.info(result.body);  

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  })

  // test search dengan email
  it('should can search using email', async () => {
    const result = await supertest(web)
      .get('/api/contacts')
      .query({
        email:  "test1"
      })
      .set('Authorization', 'test')

    logger.info(result.body);  

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  })

  // test search dengan phone
  it('should can search using email', async () => {
    const result = await supertest(web)
      .get('/api/contacts')
      .query({
        phone:  "085324353478"
      })
      .set('Authorization', 'test')

    logger.info(result.body);  

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  })

})
