const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3002;
const JWT_SECRET = "my_secret_key";

let db;

const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: path.join(__dirname, "bookstore.db"),
            driver: sqlite3.Database,
        });

        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                name TEXT NOT NULL,
                password TEXT NOT NULL
            );
        `);

        console.log("Database Connected Successfully");
        app.listen(PORT, () => {
            console.log(`Server Running at http://localhost:${PORT}/`);
        });
    } catch (error) {
        console.log(`Database Error: ${error.message}`);
        process.exit(1);
    }
};

// User Registration API
app.post("/register/", async (request, response) => {
    try {
        const { username, name, password } = request.body;

        if (!username || !name || !password) {
            return response.status(400).json({
                message: "Username, name and password are required"
            });
        }

        const existingUser = await db.get(
            `SELECT * FROM users WHERE username = ?`,
            [username]
        );

        if (existingUser !== undefined) {
            return response.status(400).json({
                message: "Username already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.run(
            `INSERT INTO users (username, name, password)
             VALUES (?, ?, ?)`,
            [username, name, hashedPassword]
        );

        response.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
});

// User Login API
app.post("/login/", async (request, response) => {
    try {
        const { username, password } = request.body;

        if (!username || !password) {
            return response.status(400).json({
                message: "Username and password are required"
            });
        }

        const user = await db.get(
            `SELECT * FROM users WHERE username = ?`,
            [username]
        );

        if (user === undefined) {
            return response.status(400).json({
                message: "Invalid username"
            });
        }

        const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatched) {
            return response.status(400).json({
                message: "Invalid password"
            });
        }

        const payload = {
            username: username
        };

        const jwtToken = jwt.sign(payload, JWT_SECRET);

        response.status(200).json({
            jwt_token: jwtToken
        });

    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
});

// Home Route
app.get("/", (request, response) => {
    response.send({
        message: "Lab 4 - User Registration and Login API",
        endpoints: {
            register: "POST /register/",
            login: "POST /login/"
        },
        status: "Server is running successfully"
    });
});

initializeDBAndServer();