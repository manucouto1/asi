# Pasos para tener el entorno funcionando

## Ruta repositorio git

```
https://github.com/manucouto1/asi.git
```

## Instalar dependencias de los proyectos

```
cd p1-client
npm install
cd ..
cd p1-server
npm install
npm run build
```

Seguramente falte alguna dependencia por añadir al package.json, solo tendréis que meter el comando:

```
npm install --save <dependencia>
```

puede que tengáis que eliminar el archivo package-lock.json.

## Instalar docker y docker-compose

### Para instalar docker

1. Tendréis que instalar docker para poder trabajar con el servidor en local

- ubuntu: https://docs.docker.com/engine/install/ubuntu/
- windows: https://docs.docker.com/desktop/windows/install/
- mac: https://docs.docker.com/desktop/mac/install/

### para instalar docker-compose

- Todos los OS: https://docs.docker.com/compose/install/

## Una vez instalado docker y docker-compose hay que lanzar el contenedor con el mongodb

El contenedor está configurado en 2 archivos:

1. El **docker-compose.yaml** -> Este es el archivo más importante, se configura un servicio que va a ejecutar una imagen _mongo:latest_ con unas variables de entorno. Montará 2 volúmenes, del sistema de archivos del vuestro ordenador dentro del contenedor y expondrá un rango de puertos para que os podáis conectar.
2. El **mongo-inig.js** -> Este archivo se ejecuta al construir el contenedor. Se carga dentro del contenedor al arrancarlo y configura la base de datos creando un usuario y una contraseña, que será con la que accederéis a la base de datos.

### El comando construye el contenedor y lo pone en ejecución en modo daemon

```
docker-compose up --build -d
```

### Si por algún motivo queréis entrar dentro del contenedor

Listaríais los contenedores en ejecución para ver el container **containerId**

```
docker ps

```

Ejecutaríais bash en modo iterativo dentro del contenedor

```
docker exec -it <containerId> bash
```

## Ahora que ya está corriendo el mongodb levantamos el p1-server

```
cd ..
cd p1-server
npm run develop
```

Al entrar la primera vez al administrador os va a pedir un usuario y una contraseña, es algo que se va a guardar localmente en vuestro mongodb así que podéis poner lo que os de la gana.

## Por último para levantar el cliente

```
cd ..
cd p1-client
npm run dev

```

# Exportar mongodb

Para exportar el estado del contenedor mongodb primero se hace un commit del contenedor en ejecución

```
docker commit <container-id> <container-name>
```

Luego guardamos la imagen en un archivo

```
docker save -o <archivo> <image-id>
```

# Importar el mongodb

Simplemente importamos la imagen del archivo

```
docker load -i <archivo>
```

# Conectarse a mongodb

autenticarse

```
mongo
use admin
db.auth('user', 'pass')
```

visualizar

```
show db
use <targetDB>
show collection
db.<targetCollection>.find()
```

# Estructura

## p1-server

Es el backend de la aplicación, está implementado en strapi que es un CMS open-source que nos permite prototipar todo el backend de forma rápida. Esto quiere decir que por defecto, el backend no se programa, pero si hubiera que modificar o añadir funcionalidades, se haría en la carpeta /api

## p1-client

ES el frontend de la aplicación, está implementado en next.js. El proyecto tiene una estructura con unas carpetas importantes:

- _api_: En esta carpeta está la funcionalidad necesari para consumir las apis de strapi
- _components_: En esta carpeta se encuentran los elementos reutilizables de la aplicación
- _context_: En esta carpeta se implementan los elementos contextuales de la app, como son las sesiones o en caso de haber un carrito de la compra en la página también se pondría aquí.
- _hooks_: En esta carpeta es donde se encuentra las funciones recuperables para ser utilizadas en la app.
- _layout_: En esta carpeta se encuentra el armazon o estructura de la página, sobre la que se montarán cada una de las vistas
- _pages_: Next.js utiliza esta carpeta para definir las rutas de la página, por ejemplo: /pages/groups/[id].js es la página de un grupo, el id es un elemento dinamico que se recogera atraves de ls url como se ve a continuación

```
http://localhost:3000/groups/61a5fa0f26180232955ea1ed
```
