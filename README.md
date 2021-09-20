# RestAPI MongoDB CRUD Operations

A RestAPI MongoDB CRUD Operations build using [NodeJS](https://nodejs.org) & [Express](https://expressjs.com) & [MongoDB](https://www.mongodb.com/)


## Installation

API requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and start the production.

```sh
cd crudAPI-MongoDB
npm install
npm start or npm run devStart
```
## Usage
### List users
Lists all users
```endpoint
GET /api/v1/
```
#### Example response

```json
{
  "status": 200,
  "response": [
    {
      "ip": "161.244.181.192",
      "_id": "6124ea78301f1d26fcfd2333",
      "fullname": "Leonanie Fullilove",
      "username": "lfullilove1",
      "email": "lfullilove1@github.io",
      "__v": 0,
      "createdAt": "2021-08-24T12:47:52.785Z",
      "updatedAt": "2021-08-24T12:47:52.785Z"
    },
    {
      "ip": "177.136.190.185",
      "_id": "6124eabb80a82e1bf03386e8",
      "fullname": "Rory Matuszyk",
      "username": "rmatuszyk0",
      "email": "rmatuszyk0@yellowpages.com",
      "__v": 0,
      "createdAt": "2021-08-24T12:48:59.717Z",
      "updatedAt": "2021-08-24T12:48:59.717Z"
    },
  ]
}
```
### Create user
Registring a new user
```endpoint
POST /api/v1/adduser
```
#### Example request body
```json
{
  "fullname": "Midge Zottoli",
  "username": "mzottoli0",
  "email": "mzottoli0@csmonitor.com",
  "password": "20212021",
}
```
#### Example response
```json
{
  "status": 200,
  "response": "OK",
  "message": "Account created succesfully ✅"
}
```
### Retrieve a user
Returns a single user.
```endpoint
GET /api/v1/{user_id}
```
### Update a user
Updates the properties of a particular users.
```endpoint
PATCH /api/v1/{user_id}
```
#### Example request body
```json
{
  "fullname": "anothername",
}
```
#### Example response
```json
{
  "status": 200,
  "response":  {
      "ip": "127.0.0.1",
      "_id": "6124f7e627ff76225c933846",
      "fullname": "anothername",
      "username": "mzottoli0",
      "email": "mzottoli0@csmonitor.com",
      "createdAt": "2021-08-24T13:45:10.679Z",
      "updatedAt": "2021-08-24T13:45:10.679Z",
      "__v": 0
    }
}
```
### Delete a user
Deletes a user by id
```endpoint
DELETE /api/v1/{user_id}
```
#### Example response
```json
{
  "status": 200,
  "message": "User Deleted Successfully"
}
```

## License
MIT