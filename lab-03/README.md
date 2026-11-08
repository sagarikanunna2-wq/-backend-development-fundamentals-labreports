# Lab 3 – REST API Development Using Node.js, Express.js and SQLite

## Student Details

| Particulars | Details | Particulars | Details |
|---|---|---|---|
| Student Name | N. VENKAT SAGARIKA | Roll Number | 252U1R5115 |
| Section | AIDE-2B | Term | Term - II |
| Subject | Backend Development Fundamentals | Module Number | 3 |
| Module Title | RESTful API Development and Validation | Submission Date | 08-11-2026 |

## Live Deployment

Not deployed. The REST API was executed locally and tested using Postman.

## Objective

To develop a RESTful API using Node.js, Express.js and SQLite. This lab focuses on implementing CRUD operations, handling query parameters, applying input validation, using appropriate HTTP status codes and debugging common backend development errors.

## Technologies Used

- Node.js
- Express.js
- SQLite
- SQLite3
- JavaScript
- Postman
- VS Code

## Project Setup and Execution

### 1. Install Dependencies

Open the project folder in VS Code and run:

```bash
npm install
```

### 2. Start the Server

Run the following command:

```bash
npx nodemon index.js
```

The server runs at:

`http://localhost:3001`

## API Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/books/` | Retrieve all books |
| GET | `/books/?search_q=The` | Search books by title |
| GET | `/books/?order_by=price&order=DESC` | Sort books |
| GET | `/books/?limit=5&offset=0` | Apply pagination |
| GET | `/books/?min_price=300&max_price=400` | Filter books by price |
| GET | `/books/:bookId/` | Retrieve a book by ID |
| POST | `/books/` | Add a new book |
| PUT | `/books/:bookId/` | Update an existing book |
| DELETE | `/books/:bookId/` | Delete a book |

## Input Validation and Status Codes

The API performs validation for required fields such as title, author and numeric price.

| Status Code | Description |
|---|---|
| 200 | Request successful |
| 201 | Book created successfully |
| 400 | Invalid input or missing required fields |
| 404 | Book not found |
| 500 | Internal server error |

## Postman Testing Screenshots

All API endpoints were tested using Postman. The following screenshots demonstrate the successful operations, validation checks and debugging exercises performed during the lab.

### 1. GET Operations

![Get All Books](screenshots/get_all_books.png)

![Get All Books - Test 2](screenshots/get_all_books2.png)

![Get All Books - Test 3](screenshots/get_all_books3.png)

![Get Single Book](screenshots/get_single_book.png)

![Get Book Not Found](screenshots/get_book_not_found.png)

### 2. Search, Sorting and Filtering

![Search Books](screenshots/search_books.png)

![Search Books - Test 2](screenshots/search_books2.png)

![Search Books - Test 3](screenshots/search_books3.png)

![Search Books - Test 4](screenshots/search_books4.png)

![Price Filter](screenshots/price_filter.png)

![Price Filter - Test 2](screenshots/price_filter2.png)

### 3. Pagination

![Pagination Limit](screenshots/pagination_limit.png)

![Pagination Limit - Test 2](screenshots/pagination_limit2.png)

![Pagination Offset](screenshots/pagination_offset.png)

![Pagination Offset - Test 2](screenshots/pagination_offset2.png)

### 4. POST Operations

![Add Book Successfully](screenshots/post_book_success.png)

![Invalid Price](screenshots/post_invalid_price.png)

![Missing Author](screenshots/post_missing_author.png)

![Missing Title](screenshots/post_missing_title.png)

### 5. PUT Operations

![Update Book](screenshots/put_update_book.png)

![Book Not Found](screenshots/put_book_not_found.png)

### 6. DELETE Operations

![Delete Book Successfully](screenshots/delete_book_success.png)

![Delete Book Not Found](screenshots/delete_book_not_found.png)

### 7. Debugging Exercises

![Port Conflict](screenshots/debug_eaddrinuse.png)

![Wrong Import Path](screenshots/debugging-wrong-import-path.png)

![Missing Await - Postman](screenshots/missing_await_pm.png)

![Missing Await - VS Code](screenshots/missing_await_vs.png)

### GET Operations

- Get all books
- Get a single book
- Search books
- Sort books
- Pagination using limit and offset
- Filter books by price
- Test book not found

### POST Operations

- Add a book successfully
- Missing title validation
- Missing author validation
- Invalid price validation

### PUT Operations

- Update an existing book
- Test updating a book that does not exist

### DELETE Operations

- Delete an existing book
- Test deleting a book that does not exist

## Debugging Exercises

The following debugging exercises were performed as part of the lab:

1. **Port Conflict (EADDRINUSE):** Demonstrated a port conflict and resolved it by identifying and terminating the process using the occupied port.
2. **Wrong Import Path:** Introduced an incorrect module name, observed the MODULE_NOT_FOUND error and corrected the import statement.
3. **Table Name Error:** Tested an incorrect database table name and corrected it to resolve the database error.
4. **Missing Await:** Removed the `await` keyword from an asynchronous database query, observed an incorrect empty JSON response and fixed the issue by restoring `await`.

## Project Structure

```text
BDF-Lab-03/
│
├── screenshots/
├── node_modules/
├── bookstore.db
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

## Conclusion

This lab provided practical experience in developing RESTful APIs using Node.js, Express.js and SQLite. It helped in understanding CRUD operations, query parameters, input validation, HTTP status codes and asynchronous programming. The debugging exercises also improved understanding of common backend errors and their solutions.