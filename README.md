# Go shopping 🛒

Requerimientos:
  - Cuenta de usuario
    - [⏱️] Poder crear una cuenta de usuario
    - [] Poder iniciar sesión con una cuenta existente
    - [] Poder cerrar sesión
    - [] Poder editar la cuenta de usuario
    - [] Poder eliminar la cuenta de usuario
  - Productos
    - [] Poder crear un nuevo producto
    - [] Poder editar un producto existente
    - [] Poder eliminar un producto existente
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
    - `imageId`: Int (Foreign Key, referencia a la tabla de imágenes)
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