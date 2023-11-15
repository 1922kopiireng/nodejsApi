# Address API SPEC

## Create Address API

Endpoint : POST  /api/contacts/:contactId/addresses

Header :
- Authorization: token

Request Body :
```json 
{
  "street": " Jalan apa ",
  "city": " kota apa ",
  "province": " Provinsi mana ",
  "country": " Negara mana ",
  "postal_code": " kode pos ",
}
```
Request Body Success :
```json 
{
  "data": {
    "id": 1,
    "street": " Jalan apa ",
    "city": " kota apa ",
    "province": " Provinsi mana ",
    "country": " Negara mana ",
    "postal_code": " kode pos ",
  }
}
```

Request Body Error :
```json 
{
  "errors": "Country is required"
}
```

## Update Address API

Endpoint : POST  /api/contacts/:contacId/addresses

Header :
- Authorization: token

Request Body :
```json 
{
  "street": " Jalan apa ",
  "city": " kota apa ",
  "province": " Provinsi mana ",
  "country": " Negara mana ",
  "postal_code": " kode pos ",
}

Request Body Success :
```json 
{
  "data": {
    "id": 1,
    "street": " Jalan apa ",
    "city": " kota apa ",
    "province": " Provinsi mana ",
    "country": " Negara mana ",
    "postal_code": " kode pos ",
  }
}
```
Request Body Error :
```json 
{
  "errors": "Country is required"
}
```

## GET Address API

Endpoint : GET  /api/contacts/:id/addresses

Request Body Success :
```json 
{
  "data": {
    "id": 1,
    "street": " Jalan apa ",
    "city": " kota apa ",
    "province": " Provinsi mana ",
    "country": " Negara mana ",
    "postal_code": " kode pos ",
  }
}
```
Request Body Error :
```json 
{ 
  "errors": "Contact is not found"
}
```

## List Address API

Endpoint : GET  /api/contacts/:id/addresses

Header :
- Authorization: token

Request Body Success :
```json
{
  "data": [
    {
      "id" : "1",
      "street": " Jalan apa ",
      "city": " kota apa ",
      "province": " Provinsi mana ",
      "country": " Negara mana ",
      "postal_code": " kode pos ",
    },
    {
      "id" : "2",
      "street": " Jalan apa ",
      "city": " kota apa ",
      "province": " Provinsi mana ",
      "country": " Negara mana ",
      "postal_code": " kode pos ",
    },
  ]
}
```

Request Body Error :
```json 
{
  "errors": "Contact is not found"
}
```

## Remove Address API

Endpoint : DELETE  /api/contacts/:id/addresses/:addressId

Request Body Success :
```json 
{
  "data": "ok"
} 
```
Request Body Error :
```json 
{
  "errors" : "Contact is not found"
}
```
