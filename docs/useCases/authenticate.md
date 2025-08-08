# Use Case - Autenticación

## Actor

Todos los usuarios.

## Goal

Autorizar a un usuario consumir los recursos del sistema.

---

## Preconditions

- El usuario debe enviar en el header de la petición `x-api-key` la API KEY única para cada sistema externo.
- El usuario debe tener una cuenta registrada en la base de datos.
- El usuario debe tener una cuenta activada en la base de datos.
- El sistema debe estar disponible.

## Postconditions

- El usuario obtendrá un token de la sesión.
- El usuario podrá consumir los recursos protegidos.

---

## Main Flow

1. El usuario envia una solicitud al endpoint `POST /api/login` con su **email** y **contraseña**.
2. La API valida la información proporcionada.
3. Si los datos son correctos:

- Se genera un `token` de sesión.
- Se devuelve el `token` junto con los datos de la cuenta.

4. El usuario almacena en sesión el token junto con los datos de la cuenta.

---

## Alternative Flow

### [Credenciales incorrectas]

- La API devuelve `401 UNAUTHORIZED` con un mensaje de error.

### [Falta Datos]

- La API devuelve `400 BAD REQUEST` con un mensaje de los parámetros faltantes.

### [Cuenta Deshabilitada]

- La API devuelve `403 FORBIDDEN` en caso de que la cuenta tenga su cuenta deshabilitada `(isActive = 0 | isActive = FALSE)`.
