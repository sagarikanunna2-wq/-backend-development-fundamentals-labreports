const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

const app = express();

app.use(express.json());

const dbPath = path.join(__dirname, "bookstore.db");

let db = null;

const PORT = process.env.PORT || 3001;

// Initialize database and start server
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    console.log("Database Connected Successfully");

    app.listen(PORT, () => {
      console.log(`Server Running at http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

// GET all books with search, sorting, pagination and price filters
app.get("/books/", async (request, response) => {
  try {
    const {
      search_q = "",
      order_by = "id",
      order = "ASC",
      limit = "10",
      offset = "0",
      min_price,
      max_price,
    } = request.query;

    // Validate sorting column
    const allowedColumns = ["id", "title", "author", "price", "pages"];

    const sortColumn = allowedColumns.includes(order_by)
      ? order_by
      : "id";

    // Validate sorting order
    const sortOrder =
      order.toUpperCase() === "DESC" ? "DESC" : "ASC";

    // Validate pagination values
    const limitValue = Number(limit);
    const offsetValue = Number(offset);

    if (
      !Number.isInteger(limitValue) ||
      limitValue <= 0 ||
      !Number.isInteger(offsetValue) ||
      offsetValue < 0
    ) {
      return response.status(400).json({
        message: "Limit must be positive and offset must be non-negative.",
      });
    }

    const conditions = [];
    const values = [];

    // Search books by partial title
    if (search_q) {
      conditions.push("title LIKE ?");
      values.push(`%${search_q}%`);
    }

    // Minimum price filter
    if (min_price !== undefined) {
      if (
        min_price === "" ||
        !Number.isFinite(Number(min_price))
      ) {
        return response.status(400).json({
          message: "Minimum price must be numeric.",
        });
      }

      conditions.push("price >= ?");
      values.push(Number(min_price));
    }

    // Maximum price filter
    if (max_price !== undefined) {
      if (
        max_price === "" ||
        !Number.isFinite(Number(max_price))
      ) {
        return response.status(400).json({
          message: "Maximum price must be numeric.",
        });
      }

      conditions.push("price <= ?");
      values.push(Number(max_price));
    }

    // Validate price range
    if (
      min_price !== undefined &&
      max_price !== undefined &&
      Number(min_price) > Number(max_price)
    ) {
      return response.status(400).json({
        message: "Minimum price cannot exceed maximum price.",
      });
    }

    const whereClause =
      conditions.length > 0
        ? `WHERE ${conditions.join(" AND ")}`
        : "";

    const getBooksQuery = `
      SELECT *
      FROM book
      ${whereClause}
      ORDER BY ${sortColumn} ${sortOrder}
      LIMIT ? OFFSET ?;
    `;

    values.push(limitValue, offsetValue);

    const books = await db.all(getBooksQuery, values);

    response.status(200).json(books);
  } catch (error) {
    console.log("Database Error:", error.message);

    response.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// GET a single book by ID
app.get("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;

    const getBookQuery = `
      SELECT *
      FROM book
      WHERE id = ?;
    `;

    const book = await db.get(getBookQuery, [bookId]);

    if (!book) {
      return response.status(404).json({
        message: "Book Not Found",
      });
    }

    response.status(200).json(book);
  } catch (error) {
    console.log("Database Error:", error.message);

    response.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// POST a new book with input validation
app.post("/books/", async (request, response) => {
  try {
    const { title, author, price, pages } = request.body;

    if (
      typeof title !== "string" ||
      title.trim() === "" ||
      typeof author !== "string" ||
      author.trim() === "" ||
      price === undefined ||
      price === null ||
      price === "" ||
      !Number.isFinite(Number(price))
    ) {
      return response.status(400).json({
        message: "Title, author and a valid numeric price are required.",
      });
    }

    const addBookQuery = `
      INSERT INTO book (title, author, price, pages)
      VALUES (?, ?, ?, ?);
    `;

    await db.run(addBookQuery, [
      title.trim(),
      author.trim(),
      Number(price),
      pages ?? null,
    ]);

    response.status(201).json({
      message: "Book Added Successfully",
    });
  } catch (error) {
    console.log("Database Error:", error.message);

    response.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// PUT - Update an existing book
app.put("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;
    const { title, author, price, pages } = request.body;

    if (
      typeof title !== "string" ||
      title.trim() === "" ||
      typeof author !== "string" ||
      author.trim() === "" ||
      price === undefined ||
      price === null ||
      price === "" ||
      !Number.isFinite(Number(price))
    ) {
      return response.status(400).json({
        message: "Title, author and a valid numeric price are required.",
      });
    }

    const updateBookQuery = `
      UPDATE book
      SET title = ?, author = ?, price = ?, pages = ?
      WHERE id = ?;
    `;

    const result = await db.run(updateBookQuery, [
      title.trim(),
      author.trim(),
      Number(price),
      pages ?? null,
      bookId,
    ]);

    if (result.changes === 0) {
      return response.status(404).json({
        message: "Book Not Found",
      });
    }

    response.status(200).json({
      message: "Book Updated Successfully",
    });
  } catch (error) {
    console.log("Database Error:", error.message);

    response.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// DELETE a book by ID
app.delete("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;

    const deleteBookQuery = `
      DELETE FROM book
      WHERE id = ?;
    `;

    const result = await db.run(deleteBookQuery, [bookId]);

    if (result.changes === 0) {
      return response.status(404).json({
        message: "Book Not Found",
      });
    }

    response.status(200).json({
      message: "Book Deleted Successfully",
    });
  } catch (error) {
    console.log("Database Error:", error.message);

    response.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Start the application
initializeDBAndServer();