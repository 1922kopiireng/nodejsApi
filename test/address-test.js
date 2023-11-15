import { createTestContact, createTestUser, removeAllTestContact, removeTestUser } from "module";
import { createTestAddress, getTesAddress, getTestContact, removeAllTestAddresses } from "./test-util";
import supertest from "supertest";


describe('POST /api/contacts/:contactId/addresses', function () {
  beforeEach(async() => {
    await createTestUser();
    await createTestContact();
  })

  afterEach(async() => {
    await removeAllTestAddresses();
    await removeAllTestContact();
    await removeTestUser();
  })

  // test membuat alamat baru
  it('should can create new addres', async () => {
    const testContact = await getTestContact();
    
    const result = supertest(web)
      .post('/api/contacts/' + testContact.id + '/addresses')
      .set('Authorization', 'test')
      .send({
        street: "jalan test",
        city: "kota test",
        province: "provinsi test",
        country: "Indonesia",
        postal_code: "234245"
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("jalan test");
    expect(result.body.data.city).toBe("kota test");
    expect(result.body.data.province).toBe("provinsi test");
    expect(result.body.data.country).toBe("Indonesia");
    expect(result.body.data.postal_code).toBe("234245");

  })

  // test jika alamat tidak benar
  it('should reject if address requestis invalid', async () => {
    const testContact = await getTestContact();
    
    const result = supertest(web)
      .post('/api/contacts/' + testContact.id + '/addresses')
      .set('Authorization', 'test')
      .send({
        street: "jalan test",
        city: "kota test",
        province: "provinsi test",
        country: "",
        postal_code: ""
      });

    expect(result.status).toBe(400);
  })

  // test jika alamat tidak benar
  it('should reject if contact is not found', async () => {
    const testContact = await getTestContact();
    
    const result = supertest(web)
      .post('/api/contacts/' + (testContact.id + 1) + '/addresses')
      .set('Authorization', 'test')
      .send({
        street: "jalan test",
        city: "kota test",
        province: "provinsi test",
        country: "",
        postal_code: ""
      });

    expect(result.status).toBe(404);
  })
})

describe('GET /api.contacts/:contactId/addresses/addressId', function (){
  beforeEach(async() => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  })

  afterEach(async() => {
    await removeAllTestAddresses();
    await removeAllTestContact();
    await removeTestUser();
  })

  // menampilkan data contact pada address
  it('should can get contact', async () => {
    const testContact = await getTestContact();
    const createTestAddress = await getTestAddress();

    const result = await supertest(web)
      .get('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("jalan test");
    expect(result.body.data.city).toBe("kota test");
    expect(result.body.data.province).toBe("provinsi test");
    expect(result.body.data.country).toBe("Indonesia");
    expect(result.body.data.postal_code).toBe("234245");
  })

  // tidak bisa menampilakn karena kontak tidak ada
  it('should reject if contact is not found', async () => {
    const testContact = await getTestContact();
    const createTestAddress = await getTestAddress();

    const result = await supertest(web)
      .get('/api/contacts/' + (testContact.id + 1) + '/addresses/' + testAddress.id)
      .set('Authorization', 'test');

    expect(result.status).toBe(404);
  })

  // tidak bisa menampilakn karena kontak tidak ada
  it('should reject if address is not found', async () => {
    const testContact = await getTestContact();
    const createTestAddress = await getTestAddress();

    const result = await supertest(web)
      .get('/api/contacts/' + testContact.id + '/addresses/' + (testAddress.id + 1))
      .set('Authorization', 'test');

    expect(result.status).toBe(404);
  })
})

describe('PUT /api/contacts/:contactId/addresses/:addressId', function(){
  beforeEach(async() => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  })

  afterEach(async() => {
    await removeAllTestAddresses();
    await removeAllTestContact();
    await removeTestUser();
  })

  // update alamat berhasil
  it ('should can update address',  async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put('/api/contacts/' + testContact.id + '(/addresses/)' + testAddress.id)
      .set('Authorization', 'test')
      .send({
        street: "street",
        city: "city",
        province: "provinsi",
        country: "indonesia",
        postal_code: "1111"
      });
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testAddress.id);
    expect(result.body.data.city).toBe("street");
    expect(result.body.data.province).toBe("provinsi");
    expect(result.body.data.country).toBe("indonesia");
    expect(result.body.data.postal_code).toBe("1111");
  })

  // update alamat gagal
  it ('should reject if request is not valid',  async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put('/api/contacts/' + testContact.id + '(/addresses/)' + testAddress.id)
      .set('Authorization', 'test')
      .send({
        street: "street",
        city: "city",
        province: "provinsi",
        country: "",
        postal_code: ""
      });
    expect(result.status).toBe(400);
  })

  // update address id tidak ketemu
  it ('should reject if address is not found',  async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put('/api/contacts/' + testContact.id + '(/addresses/)' + (testAddress.id + 1))
      .set('Authorization', 'test')
      .send({
        street: "street",
        city: "city",
        province: "provinsi",
        country: "indonesia",
        postal_code: "1111"
      });
    expect(result.status).toBe(404);
  })

  // update kontak id tidak ketemu
  it ('should reject if address is not found',  async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put('/api/contacts/' + (testContact.id + 1) + '(/addresses/)' + testAddress.id)  //+1 buat salahin kontak id
      .set('Authorization', 'test')
      .send({
        street: "street",
        city: "city",
        province: "provinsi",
        country: "indonesia",
        postal_code: "1111"
      });
    expect(result.status).toBe(404);
  })
})

describe('DELETE /api/contacts/:contactId/addresses/:addressId', function (){
  beforeEach(async() => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  })

  afterEach(async() => {
    await removeAllTestAddresses();
    await removeAllTestContact();
    await removeTestUser();
  })

  // test adddres remove berhasil
  it('should can remove address', async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress(); //memastikan tidak ada data di db

    const result = await supertest(web)
      .delete('api.contacts/' + testContact.id + '/addresses/' +  testAddress.id)
      .set('Authorization', 'test');
    
    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testAddress = await getTesAddress();
    expect(testAddress).toBeNull();
  })

  // test adddres remove gagal address is tidak valid
  it('should reject if address not found', async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress(); //memastikan tidak ada data di db

    const result = await supertest(web)
      .delete('api.contacts/' + testContact.id + '/addresses/' +  (testAddress.id + 1))
      .set('Authorization', 'test');
    
    expect(result.status).toBe(404);
  })

  // test adddres remove gagal kontact id tidak valid
  it('should reject if contact not found', async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress(); //memastikan tidak ada data di db

    const result = await supertest(web)
      .delete('api.contacts/' + (testContact.id + 1) + '/addresses/' +  testAddress.id)
      .set('Authorization', 'test');
    
    expect(result.status).toBe(404);
  })
})

describe('GET /api/contacts/:contactId/addresses', function (){
  beforeEach(async() => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  })

  afterEach(async() => {
    await removeAllTestAddresses();
    await removeAllTestContact();
    await removeTestUser();
  })

  it('should can list addresses', async () => {
    const testContact = await getTestContact();
    
    const result = await supertest(web)
      .get('api/contacts/' + testContact.id + "/addresses")
      .set('Authorization', 'test');

  expect(result.status).toBe(200);
  expect(result.body.data.length).toBe(1);
  });

  // list tidak valid
  it('should reject if contact is not found', async () => {
    const testContact = await getTestContact();
    
    const result = await supertest(web)
      .get('api/contacts/' + (testContact.id + 1) + "/addresses")
      .set('Authorization', 'test');

  expect(result.status).toBe(404);
  });
})