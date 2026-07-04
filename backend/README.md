# User Authentication API

This API handles user registration, login, profile access, and logout.

## `POST /users/register`

Creates a new user account. The password is hashed before storage, and a JWT auth token is returned on success.

**Base URL:** `http://localhost:3000` (or the value of `PORT` in your `.env` file)

---

## Request

| Property | Value |
|----------|-------|
| **Method** | `POST` |
| **Path** | `/users/register` |
| **Content-Type** | `application/json` |

### Request body

Send a JSON object with the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | `string` | Yes | Valid email address. Stored in lowercase and must be unique. |
| `password` | `string` | Yes | Minimum 6 characters. Hashed with bcrypt before saving. |
| `fullname.firstname` | `string` | Yes | Minimum 3 characters. |
| `fullname.lastname` | `string` | No | Minimum 3 characters when provided. |

### Example request

```json
{
  "email": "john.doe@example.com",
  "password": "secret123",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  }
}
```

### Validation rules

Validation is handled by `express-validator` on the route and by the Mongoose schema in the user model:

- **email** — must be a valid email format
- **fullname.firstname** — required, at least 3 characters
- **password** — required, at least 6 characters
- **fullname.lastname** — optional; if sent, must be at least 3 characters (enforced by the model)

---

## Responses

### `201 Created`

User was created successfully.

```json
{
  "message": "User created successfully",
  "user": {
    "_id": "665f1a2b3c4d5e6f7a8b9c0d",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

The `token` is a JWT signed with `JWT_SECRET` from your environment variables. Use it for authenticated requests. For login, the server also sets a `token` cookie on successful authentication.

> **Note:** The password is excluded from the response (`select: false` on the user model).

---

### `400 Bad Request`

Request failed validation. The response includes an `errors` array with details for each invalid field.

```json
{
  "errors": [
    {
      "type": "field",
      "value": "ab",
      "msg": "First name must be at least 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

Common validation failures:

| Condition | Status | Message |
|-----------|--------|---------|
| Invalid or missing email | `400` | `Invalid email address` |
| First name shorter than 3 characters | `400` | `First name must be at least 3 characters long` |
| Password shorter than 6 characters | `400` | `Password must be at least 6 characters long` |

---

### `500 Internal Server Error`

May occur if required fields pass route validation but are missing at the service layer, or if the database rejects the request (for example, a duplicate email due to the unique constraint on `email`).

---

## Flow

1. Route validates `email`, `fullname.firstname`, and `password`.
2. Controller returns `400` if validation fails.
3. Password is hashed via `userModel.hashPassword()`.
4. User record is created through `userService.createUser()`.
5. A JWT is generated with `user.generateAuthToken()`.
6. Response is sent with status `201`, the new user, and the token.

---

## `POST /users/login`

Authenticates an existing user and returns a JWT auth token on success.

**Base URL:** `http://localhost:3000` (or the value of `PORT` in your `.env` file)

### Request

| Property | Value |
|----------|-------|
| **Method** | `POST` |
| **Path** | `/users/login` |
| **Content-Type** | `application/json` |

### Request body

Send a JSON object with the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | `string` | Yes | Registered email address. |
| `password` | `string` | Yes | Password for the account. |

### Example request

```json
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Validation rules

Validation is handled by `express-validator` on the route:

- **email** — must be a valid email format
- **password** — required, at least 6 characters

### Responses

#### `200 OK`

User was authenticated successfully. The server also sets a `token` cookie for subsequent authenticated requests.

```json
{
  "message": "User logged in successfully",
  "user": {
    "_id": "665f1a2b3c4d5e6f7a8b9c0d",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### `400 Bad Request`

Request failed validation. The response includes an `errors` array with details for each invalid field.

```json
{
  "errors": [
    {
      "type": "field",
      "value": "bad-email",
      "msg": "Invalid email address",
      "path": "email",
      "location": "body"
    }
  ]
}
```

#### `401 Unauthorized`

Returned when the email does not exist or the password is incorrect.

```json
{
  "message": "Invalid email or password"
}
```

#### `500 Internal Server Error`

Returned if authentication fails unexpectedly, such as a database or server error.

---

## `GET /users/profile`

Fetches the authenticated user's profile.

**Base URL:** `http://localhost:3000` (or the value of `PORT` in your `.env` file)

### Request

| Property | Value |
|----------|-------|
| **Method** | `GET` |
| **Path** | `/users/profile` |
| **Authentication** | Required |

### Authentication

Provide the JWT either:

- via the `token` cookie set by login, or
- via the `Authorization` header as `Bearer <token>`

### Responses

#### `200 OK`

Returns the authenticated user's profile.

```json
{
  "message": "User profile fetched successfully",
  "user": {
    "_id": "665f1a2b3c4d5e6f7a8b9c0d",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### `401 Unauthorized`

Returned when no valid token is provided.

```json
{
  "message": "Access denied. Unauthorized."
}
```

---

## `GET /users/logout`

Logs the current user out by clearing the auth cookie and blacklisting the active token.

**Base URL:** `http://localhost:3000` (or the value of `PORT` in your `.env` file)

### Request

| Property | Value |
|----------|-------|
| **Method** | `GET` |
| **Path** | `/users/logout` |
| **Authentication** | Required |

### Authentication

Provide the JWT either:

- via the `token` cookie set by login, or
- via the `Authorization` header as `Bearer <token>`

### Responses

#### `200 OK`

User was logged out successfully.

```json
{
  "message": "User logged out successfully"
}
```

#### `401 Unauthorized`

Returned when no valid token is provided.

```json
{
  "message": "Access denied. Unauthorized."
}
```

---

## `POST /captains/register`

Creates a new captain account with vehicle details. The password is hashed before storage, and a JWT auth token is returned on success.

**Base URL:** `http://localhost:3000` (or the value of `PORT` in your `.env` file)

### Request

| Property | Value |
|----------|-------|
| **Method** | `POST` |
| **Path** | `/captains/register` |
| **Content-Type** | `application/json` |

### Request body

Send a JSON object with the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | `string` | Yes | Valid email address. Stored in lowercase and must be unique. |
| `password` | `string` | Yes | Minimum 6 characters. Hashed with bcrypt before saving. |
| `fullname.firstname` | `string` | Yes | Minimum 3 characters. |
| `fullname.lastname` | `string` | No | Minimum 3 characters when provided. |
| `vehicle.color` | `string` | Yes | Minimum 3 characters. |
| `vehicle.plate` | `string` | Yes | Minimum 3 characters. |
| `vehicle.capacity` | `number` | Yes | Minimum 1. |
| `vehicle.vehicleType` | `string` | Yes | Must be one of `car`, `bike`, or `autorikshaw`. |

### Example request

```json
{
  "email": "captain@example.com",
  "password": "secret123",
  "fullname": {
    "firstname": "Captain",
    "lastname": "Doe"
  },
  "vehicle": {
    "color": "white",
    "plate": "UP14BS9058",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Validation rules

Validation is handled by `express-validator` on the route and by the Mongoose schema in the captain model:

- **email** — must be a valid email format
- **fullname.firstname** — required, at least 3 characters
- **password** — required, at least 6 characters
- **vehicle.color** — required, at least 3 characters
- **vehicle.plate** — required, at least 3 characters
- **vehicle.capacity** — required, integer, at least 1
- **vehicle.vehicleType** — must be one of `car`, `bike`, or `autorikshaw`

### Responses

#### `201 Created`

Captain was created successfully.

```json
{
  "message": "Captain created successfully",
  "captain": {
    "_id": "665f1a2b3c4d5e6f7a8b9c0d",
    "fullname": {
      "firstname": "Captain",
      "lastname": "Doe"
    },
    "email": "captain@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "white",
      "plate": "UP14BS9058",
      "capacity": 4,
      "vehicleType": "car"
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### `400 Bad Request`

Returned when validation fails or the email is already registered.

```json
{
  "message": "Captain with this email already exists"
}
```

#### `500 Internal Server Error`

Returned if the request fails unexpectedly during account creation.

---

## Environment variables

| Variable | Purpose |
|----------|---------|
| `PORT` | Server port (default: `3000`) |
| `JWT_SECRET` | Secret used to sign auth tokens |
| MongoDB connection string | Required for database access (see `.env`) |
