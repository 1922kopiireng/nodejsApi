# Contact API Spec
## Create Contact API

Endpoint : POST /api/contacts

Headers :
- Authorization : token

Request Body :
```json
{
  "first_name" : "jefry",
  "last_name" : "kurniawan",
  "email" : "jefryk@gmail.com",
  "phone" : "083242234",
}
```
Respone Body Success :
```json
{
  "id" : "1",
  "first_name" : "jefry",
  "last_name" : "kurniawan",
  "email" : "jefryk@gmail.com",
  "phone" : "083242234",
}
```

Respone Body Error :
```json
{
  "errors" : "Email  is not valid format"
}
```

## Update Contact API

Endpoint : POST /api/contacts/:id

Headers :
- Authorization : token

Request Body :
```json
{
  "first_name" : "jefry",
  "last_name" : "kurniawan",
  "email" : "jefryk@gmail.com",
  "phone" : "083242234",
}
```
Respone Body Success :
```json
{
  "data" {
    "id" : "1",
    "first_name" : "jefry",
    "last_name" : "kurniawan",
    "email" : "jefryk@gmail.com",
    "phone" : "083242234",
  }
}
```

Respone Body Error :
```json
{
  "errors": "Email is not valid format",
}

## Get Contact API

Endpoint : GET /api/contacts/:id

Headers :
- Authorization : token

Respone Body Success :
```json
{
  "data" {
    "id" : "1",
    "first_name" : "jefry",
    "last_name" : "kurniawan",
    "email" : "jefryk@gmail.com",
    "phone" : "083242234",
  }
}
```

Respone Body Error :
```json
{
  "errors" : "Contact is not found"
}
```
## Search Contact API

Endpoint : GET /api/contacts

Headers :
- Authorization : token

Query Params :
- name : Search by first_name or last_name, optional
- email : Searcg by email using like, optional
- phone :  Search by phone 
- page : number of page,  default 1
- size : size per page, default 1

Respone Body Success :
```json 
{
  "data" : [
    {
      "id" : "1",
      "first_name" : "jefry",
      "last_name" : "kurniawan",
      "email" : "jefryk@gmail.com",
      "phone" : "083242234",
    },
    {
      "id" : "2",
      "first_name" : "jefry",
      "last_name" : "kurniawan",
      "email" : "jefryk@gmail.com",
      "phone" : "083242234",
    }
  ],
  "pagin" : {
     "page" : 1,
     "total_page": 3,
     "total_item": 30
  }
}
 
```
Respone Body Error :

## Remove Contact API

Endpoint : DELETE /api/contacts/:id

Headers :
- Authorization : token

Respone Body Success :
```json
{
  "data" : "ok"
}
```
Respone Body Error :
```json
{
  "errors" : "Contact is not found"
}
```
