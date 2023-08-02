# listPeople - GET

Funcionalidad que retorna el listado de personajes

## Parámetros

- hair_color (opcional)
- offset
- nextToken

## Respuesta

```json
[
    {
		"id": 1,
		"name": "Luke Skywalker",
		"birth_year": "19 BBY",
		"eye_color": "Blue",
		"gender": "Male",
		"hair_color": "Blond",
		"skin_color": "Fair"
	},
    ...
]
```

## Base de datos

- Se usa la tabla `people`


## Lógica de negocio

...
...


## Funcionalidad


```mermaid
sequenceDiagram
Handler ->> Logic: Params
Note right of Model: mysql2
Logic->>Model: Params
Model-->>MySQL: Petición
Note right of MySQL: Select * from `people`
MySQL-->>Model: Respuesta
Model-->>Logic: Respuesta
Logic--x Handler: Response

```