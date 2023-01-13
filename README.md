<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://periferiaitgroup.com/wp-content/uploads/2022/09/periferia-it-corp-logo.svg" width="200" alt="Periferia Logo" /></a>
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

8. Loguearse
```
http://localhost:3000/api/auth/login
```
```ts
> Body
{
    "email":"test1@google.com",
    "password":"Abc123"
}
```

9. Tomar el token de sesion
```ts
> Response
{
    "id": "b690ea3a-52c5-44d2-a487-3fc42d990f28",
    "email": "test1@google.com",
    "password": "$2b$10$YOKWp4eT4pqZ8OVK8VMkvuGdqPBFBpjImt1LZoHrh/l4Lye/lBAVK",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI2OTBlYTNhLTUyYzUtNDRkMi1hNDg3LTNmYzQyZDk5MGYyOCIsImlhdCI6MTY3MzU4MTA4NiwiZXhwIjoxNjczNTg4Mjg2fQ.iT7EpTFqNFhaCWd6qeIoF7Iev600lzSR8WHa2ejeI_M"
}
```
10. Añadir el token en autorization bearer token ej:postman
11. Añadir productos al carrito (verificar los id de los productos en la DB)
```
http://localhost:3000/api/shoppings
```
```ts
> Body
{
   "cart":[
       {
       "product":"0b699130-57e3-4bef-b174-c7af5d9ffdcd",
       "quantity": 2
       }, 
       {
       "product":"01d760de-700c-4f1b-a881-79b1bd2b2da1",
       "quantity": 5
       }

   ] 
}
```
12. Crear orden
```
http://localhost:3000/api/shoppings/orders
```
```ts
> Body
{
    "shoppingId":"67a869c5-7c4a-46e5-a7fc-c2da34e40314"
}
```
13. todos los productos ordenados por mayor venta
```
http://localhost:3000/api/products?limit=[numero]&offset=[numero] ej:http://localhost:3000/api/products?limit=2&offset=1
```

Más información leer la documentación
```
http://localhost:3000 (en el navegador)
```
