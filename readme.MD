# ¡Bienvenido al proyecto Starwars!

Este es un ejemplo sencillo y muy básico que utiliza el framework Serverless, el patrón de arquitectura de microservicios, base de datos mysql, jest, github actions y AWS.

## Ver video explicativo

https://loom.com/video/sdfsdfsdfds

## Pre-requisitos

- Nodejs
- MySQL
- Crear BD llamada starwars

## Instalación

```sh
npm i
```

## Crear .env.local

```txt
HOST=<<mysql host>>
USER=<<usuario mysql>>
BD=starwars
```

## Deploy

Solo pusheando a la rama.

Se ejecutará el workflow definido y hará las pruebas y el deploy a aws.


## Funcionalidad


```mermaid
sequenceDiagram
Front ->> Backend: Request
Note right of Backend: mysql2 npm pkg
Backend->>MySQL: Query
MySQL-->>Backend: Data
Backend--x Front: Response

Front ->> Backend: Request
Backend->>SWAPI: Fetch
SWAPI-->>Backend: Data
Backend-->>Front: Response
```