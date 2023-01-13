<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Periferia Test API

1. Clonar proyecto
2. ```yarn install  o npm install```
3. Clonar el archivo ```.env.template``` y renombrarlo a ```.env```
4. Cambiar las variables de entorno
5. Levantar la base de datos
```
docker-compose up -d
```

6. Levantar: ```yarn start:dev```

7. Ejecutar SEED 
```
http://localhost:3000/api/seed
```

8.loguearse
```
http://localhost:3000/api/auth/login
```
```ts
{
    "email":"test1@google.com",
    "password":"Abc123"
}
```

9. tomar el token de sesion
```ts
{
    "id": "b690ea3a-52c5-44d2-a487-3fc42d990f28",
    "email": "test1@google.com",
    "password": "$2b$10$YOKWp4eT4pqZ8OVK8VMkvuGdqPBFBpjImt1LZoHrh/l4Lye/lBAVK",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI2OTBlYTNhLTUyYzUtNDRkMi1hNDg3LTNmYzQyZDk5MGYyOCIsImlhdCI6MTY3MzU4MTA4NiwiZXhwIjoxNjczNTg4Mjg2fQ.iT7EpTFqNFhaCWd6qeIoF7Iev600lzSR8WHa2ejeI_M"
}
```




