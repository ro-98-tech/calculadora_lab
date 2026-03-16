# 🧮 Calculadora Fullstack (Spring Boot + Frontend estático)

¡Bienvenido! Este proyecto es una **calculadora simple** que expone una API REST en Java (Spring Boot) y tiene una **interfaz web estática** (HTML/JS/CSS) para interactuar.

---

##  ¿Qué hace?

- Recibe operaciones matemáticas (sumar, restar, multiplicar, dividir) mediante un endpoint REST.
- Devuelve el resultado en JSON.
- Incluye una UI web simple que consume esa API.

---

## Tecnologías usadas

- Java 17+
- Spring Boot
- Maven
- Frontend estático: HTML + CSS + JavaScript

---

## ¿Cómo ejecutar?

###  Desde la terminal (Windows)
Abre una consola en `calc-backend/` y ejecuta:

```powershell
.\mvnw.cmd spring-boot:run
```

 Luego abre en tu navegador:

```
http://localhost:8080/
```

---

##  ¿Cómo probar la API (ejemplo con curl)?

### Endpoint principal:
`POST /api/calc`

Body JSON:

```json
{
  "a": 10,
  "b": 5,
  "operation": "add"
}
```

 Respuesta:

```json
{
  "result": 15
}
```

### Operaciones soportadas
- `add` → suma
- `subtract` → resta
- `multiply` → multiplicación
- `divide` → división

---

##  Estructura clave

- `src/main/java/com/calculator/calc_backend/controller/CalcController.java` → endpoints
- `src/main/java/com/calculator/calc_backend/service/CalcService.java` → lógica de operaciones
- `src/main/java/com/calculator/calc_backend/dto/CalcRequest.java` → DTO de request
- `src/main/java/com/calculator/calc_backend/dto/CalcResponse.java` → DTO de respuesta
- `src/main/resources/static/index.html` → UI
- `src/main/resources/static/script.js` → lógica frontend
- `src/main/resources/static/styles.css` → estilos

---

##  Compilar y generar JAR

```powershell
.\mvnw.cmd clean package
```

El JAR resultante queda en `target/` (ej. `calc-backend-0.0.1-SNAPSHOT.jar`).

Y lo puedes ejecutar con:

```powershell
java -jar target\calc-backend-0.0.1-SNAPSHOT.jar
```

---

