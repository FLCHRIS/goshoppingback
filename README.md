# Go shopping 🛒

![Imagen de inicio](./illustration.png)

<div align="center">

![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white)

</div>

Este proyecto es una API de **e-commerce** 🛒 diseñada para demostrar mis habilidades en la creación de APIs, bases de datos y manejo de archivos. Utiliza diversas tecnologías y buenas prácticas de desarrollo de software para ofrecer una solución escalable, fácil de mantener y segura. La API permite gestionar usuarios, productos, ventas y sus relaciones, mostrando mis habilidades en el desarrollo backend. 🙃

## Indice

- [Características](#características)
- [Endpoints](#endpoints)
  - [Módulo de Autenticación ](#módulo-de-autenticación)
    - [Endpoint de Registro](#endpoint-de-registro)
    - [Endpoint de Inicio de sesión](#endpoint-de-inicio-de-sesión)
  - [Módulo de Usuarios](#módulo-de-usuarios)
    - [Endpoint de editar usuario](#endpoint-de-editar-usuario)
    - [Endpoint de editar foto de perfil](#endpoint-de-editar-foto-de-perfil)
    - [Endpoint de eliminar usuario](#endpoint-de-eliminar-usuario)

## Características

- **Gestión de Usuarios**: Registro, autenticación, edición y eliminación de usuarios.
- **Gestión de Productos**: Creación, edición, eliminación y visualización de productos.
- **Carrito de Compras**: Agregar, eliminar productos del carrito, calcular total y realizar pagos.
- **Favoritos**: Agregar y eliminar productos de favoritos, visualización de productos favoritos.
- **Ventas**: Realización de ventas y gestión de pedidos.
- **Búsquedas**: Búsqueda de productos por nombre y categoría.
- **Subida de Imágenes**: Manejo de imágenes de productos.

## Endpoints

### Módulo de Autenticación

RUTA: `/api/auth`

#### Endpoint de Registro

[POST] `http://127.0.0.1:3000/api/auth/register`

```javascript
fetch('http://127.0.0.1:3000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: '...',
    userName: '...',
    password: '...',
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error))
```

#### Endpoint de Inicio de sesión

RUTA: `/api/auth/login`

[POST] `http://127.0.0.1:3000/api/auth/login`

```javascript
fetch('http://127.0.0.1:3000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: '...',
    password: '...',
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error))
```

### Módulo de Usuarios

RUTA: `/api/users`

#### Endpoint de editar usuario

[PATCH] `http://127.0.0.1:3000/api/users/{userId}`

```javascript
fetch('http://127.0.0.1:3000/api/users/{userId}', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ...',
  },
  body: JSON.stringify({
    userName: '...',
    password: '...',
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error))
```

#### Endpoint de editar foto de perfil

[PATCH] `http://127.0.0.1:3000/api/users/{userId}/photo`

```javascript
const userId = '...'
const fileInput = document.getElementById('...')
const file = fileInput.files[0]

const formData = new FormData()
formData.append('image', file)

fetch(`http://127.0.0.1:3000/api/users/${userId}/photo`, {
  method: 'PATCH',
  headers: {
    Authorization: 'Bearer ...',
  },
  body: formData,
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error))
```

#### Endpoint de eliminar usuario

[DELETE] `http://127.0.0.1:3000/api/users/{userId}`

```javascript
fetch('http://127.0.0.1:3000/api/users/{userId}', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ...',
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error))
```

## Requerimientos:

- Cuenta de usuario
  - [✅] Poder crear una cuenta de usuario
  - [✅] Poder iniciar sesión con una cuenta existente
  - [✅] Poder editar la cuenta de usuario
  - [✅] Poder cambiar la foto de perfil
  - [✅] Poder eliminar la cuenta de usuario
  - [] Poder cerrar sesión
- Productos
  - [] Poder crear un nuevo producto
  - [] Poder editar un producto existente
  - [] Poder eliminar un producto existente
  - [] Poder ver los productos del dueño vendidos, cuantos en existencia, etc.
- Carrito de compras
  - [] Poder agregar productos al carrito
  - [] Poder eliminar productos del carrito
  - [] Poder calcular el total del carrito
  - [] Poder vaciar el carrito
  - [] Poder pagar el carrito
- Favoritos
  - [] Poder agregar favoritos
  - [] Poder ver favoritos
  - [] Poder eliminar favoritos
- Pasarelas de pago
  - [] Poder realizar un pago con tarjeta de credito
- Busquedas
  - [] Poder realizar busquedas por medio de su nombre, categoría
- Visualización de los productos
  - [] Poder visualizar los productos en una grilla
  - [] Poder visualizar a detalle un producto

Modelos:

- Usuarios:
  - `id`: Int (Primary Key) ✅
  - `userName`: String (Not Null) ✅
  - `password`: String (Not Null) ✅
  - `email`: String (Not Null) ✅
  - `createdAt`: DateTime ✅
  - `updatedAt`: DateTime ✅
  - `imageId`: Int (Foreign Key, referencia a la tabla de imágenes) ✅
  - `cards`: List<Card> (Relación uno a muchos con tarjetas)
  - `favorites`: List<Favorito> (Relación uno a muchos con favoritos)
  - `carts`: List<Carrito> (Relación uno a muchos con carritos)
  - `orders`: List<Order> (Relación uno a muchos con pedidos)
- Productos:
  - `id`: Int (Primary Key)
  - `name`: String (Not Null)
  - `description`: String
  - `price`: Float
  - `createdAt`: DateTime
  - `category`: String
  - `stock`: Int
  - `userId`: Int (Foreign Key, referencia al usuario que publicó el producto)
  - `imageId`: Int (Foreign Key, referencia a la tabla de imágenes)
- Carrito:
  - `id`: Int (Primary Key)
  - `createdAt`: DateTime
  - `total`: Float
  - `userId`: Int (Foreign Key, referencia al usuario propietario del carrito)
  - `products`: List<CarritoProducto> (Relación uno a muchos con productos en el carrito)
- Favorito:
  - `id`: Int (Primary Key)
  - `createdAt`: DateTime
  - `userId`: Int (Foreign Key, referencia al usuario propietario de la lista de favoritos)
  - `products`: List<FavoritoProducto> (Relación uno a muchos con productos favoritos)
- Card:
  - `id`: Int (Primary Key)
  - `number`: String
  - `expirationDate`: Date
  - `cvv`: String
  - `name`: String
  - `createdAt`: DateTime
  - `userId`: Int (Foreign Key, referencia al usuario propietario de la tarjeta)
- Order:
  - `id`: Int (Primary Key)
  - `createdAt`: DateTime
  - `userId`: Int (Foreign Key, referencia al usuario que realizó el pedido)
  - `cardId`: Int (Foreign Key, referencia a la tarjeta utilizada)
  - `total`: Float
  - `status`: String (Estado del pedido, por ejemplo, 'pending', 'paid', 'shipped', 'delivered', 'cancelled')
  - `products`: List<OrderProducto> (Relación uno a muchos con productos en el pedido)
- Imagenes: ⏱️
  - `id`: Int (Primary Key) ✅
  - `url`: String (URL de la imagen en Cloudinary) ✅
  - `publicId`: String (ID público de la imagen en Cloudinary) ✅
  - `createdAt`: DateTime ✅
    **Relaciones de uno a muchos**
- CarritoProducto:
  - `id`: Int (Primary Key)
  - `carritoId`: Int (Foreign Key, referencia al carrito)
  - `productId`: Int (Foreign Key, referencia al producto)
  - `quantity`: Int (Cantidad de ese producto en el carrito)
- FavoritoProducto:
  - `id`: Int (Primary Key)
  - `favoritoId`: Int (Foreign Key, referencia al favorito)
  - `productId`: Int (Foreign Key, referencia al producto)
- OrderProducto:
  - `id`: Int (Primary Key)
  - `orderId`: Int (Foreign Key, referencia al pedido)
  - `productId`: Int (Foreign Key, referencia al producto)
  - `quantity`: Int (Cantidad de ese producto en el pedido)
  - `price`: Float (Precio del producto en el momento de la compra)

```
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="mysql://root:1234@localhost:3306/goshopping"
JWT_SECRET="7li?HiEmWLSg-PEF"
```

docker-compose up
docker exec -it bb1 mysql -u root -p
