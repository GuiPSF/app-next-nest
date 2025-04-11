# MongoDB

Go to https://www.mongodb.com/try/download/community and install Mongo

# Dependencies to Install

```
npm i turbo @nestjs/mongoose mongoose uuid @nestjs/config @types/bcrypt bcrypt @nestjs/passport passport-jwt @nestjs/jwt class-validator class-transformer styled-components
```

# Environment

Create a file .env on the backend folder, and a .env.local on the web folder

.env

```
JWT_SECRET=secret_key
JWT_EXPIRES=1d
MONGO_URL=mongodb://127.0.0.1/fullstacknest
```

.env.local

```
API_URL="http://localhost:3333"
```
