# Pasos para tener el entorno funcionando
## Instalar dependencias de los proyectos
```
cd p1-client
npm install
cd ..
cd p1-server
npm install
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
1. El **docker-compose.yaml** -> Este es el archivo más importante, se configura un servicio que va a ejecutar una imagen *mongo:latest* con unas variables de entorno. Montará 2 volúmenes, del sistema de archivos del vuestro ordenador dentro del contenedor y expondrá un rango de puertos para que os podáis conectar.
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

