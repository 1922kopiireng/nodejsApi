# User API Specs

## Register User API

Endpoint: POST /api/users

Request body : 
```json
{
  "username" : "jk",
  "password" : "jefry123",
  "name" : "jefry kurniawan",

}

Response body sucess :
```json 
{
  "data": { 
    "username" : "jk",
    "name" : "jefry kurniawan"
   } 
}
```

Response body error :
```json 
{
  "errors": "Username already registered"
}
```
## Login User API

Endpoint : POST  /api/users/login

Request body :
```json
{
  "username": "jk",
  "password": "jefry123"
}
```

Request body success :
```json
{
  "data": {
    "token" : "unique-token"
  }
}
```
Request body error :
```json
{
  "data": {
    "token" : "username or password wrong!"
  }
}
```

## Update User API

Endpoint : POST  /api/users/current

Headers :
- Authorization : token 

Request body :
```json
{
  "name": "jefry kurniawan", //optional
  "password": "new password" //optional
}
```

Request body success :
```json
{
  "data": {
    "username" : "jk",
    "user" : " jefry kurniawan "
  }
}
```
Request body error :
```json
{
   "error" : "Name length max 100"
}
```

## Get User API

Endpoint : POST  /api/users/current

Headers :
- Authorization : token 

Request body success :
```json
{
  "data": {
    "username" : "jk",
    "user" : " jefry kurniawan "
  }
}
```
Request body error :
```json
{
  "errors" : "Unauthorized"
}
```

## Logout User API

Endpoint : POST  /api/users/logout

Headers :
- Authorization : token

Request body succes :
```json
{
  "data": "ok"
}
```
Request body error :
```json
{
  "errors": "Unauthorized"
}
```