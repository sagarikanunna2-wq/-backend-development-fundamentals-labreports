# Lab 4: Registration, Login and JWT

| Particulars | Details | Particulars | Details |
|---|---|---|---|
| Student Name | N. VENKAT SAGARIKA | Roll Number | 252U1R5115 |
| Section | AIDE-2B | Term | Term - II |
| Subject | Backend Development Fundamentals | Module Number | 4 |
| Module Title | Authentications and User Management | Submission Date | 14-11-2026 |

## Objective

To implement user registration and login functionality using Node.js, Express.js, SQLite, bcrypt and JSON Web Tokens (JWT). Passwords are securely hashed before storing them in the database, and successful login generates a JWT for authentication.

## Technologies Used

- Node.js
- Express.js
- SQLite
- bcrypt
- jsonwebtoken
- Postman
- VS Code

## Installation and Execution

1. Open the project folder in VS Code.
2. Install the required dependencies:

```bash
npm install
```

3. Start the server:

```bash
node index.js
```

4. The server runs at:

```text
http://localhost:3002/
```

## Database Structure

The SQLite database contains a `users` table with the following columns:

| Column | Description |
|---|---|
| id | Unique user ID |
| username | Unique username |
| name | User's name |
| password | Hashed password |

Passwords are stored as bcrypt hashes, not as plain text.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register/` | Registers a new user |
| POST | `/login/` | Authenticates a user and returns a JWT |

## Testing with Postman

The following test cases were performed:

1. Successful user registration.
2. Registration with missing fields.
3. Registration with an existing username.
4. Successful login with valid credentials.
5. Login with an incorrect password.
6. Login with an unknown username.
7. Login with missing fields.
8. Database verification of the stored password hash.
9. JWT generation after successful login.
10. JWT decoding to inspect the header and payload.

## Screenshots

### 1. Database Password Hash

![Database Password Hash](screenshotsL4/database_password_hash.png)

### 2. Successful Registration

![Successful Registration](screenshotsL4/register_success.png)

### 3. Duplicate Username

![Duplicate Username](screenshotsL4/register_duplicate.png)

### 4. Registration with Missing Fields

![Registration Missing Fields](screenshotsL4/register_missing_fields.png)

### 5. Successful Login

![Successful Login](screenshotsL4/login_success.png)

### 6. Login with Incorrect Password

![Wrong Password](screenshotsL4/login_wrong_password.png)

### 7. Login with Unknown Username

![Unknown Username](screenshotsL4/login_unknown_user.png)

### 8. Login with Missing Fields

![Login Missing Fields](screenshotsL4/login_missing_fields.png)

### 9. JWT Decoding

![JWT Decoded](screenshotsL4/jwt_decoded.png)

## Conclusion

The registration and login system was successfully implemented using Node.js, Express.js and SQLite. Passwords were securely hashed using bcrypt, and JWT tokens were generated after successful authentication. Different valid and invalid scenarios were tested using Postman to verify the application's functionality and error handling.