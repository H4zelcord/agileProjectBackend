# Agile Project Backend

This is a Node.js backend project built with Express.js and MySQL. It provides a simple API for managing users and testing database connections.

---

## Features
- **Test Database Connection**: A `/test-db` endpoint to verify the database connection.
- **User Management**:
  - `GET /api/users`: Fetch all users.
  - `POST /api/users`: Add a new user.

---

## Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/agileProjectBackend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd agileProjectBackend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your database credentials:
   ```env
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   DB_PORT=your_database_port
   ```

### Running the Server

Start the server:
```bash
npm start
```
The server will run on `http://localhost:3000`.

---

## API Endpoints

### Test Database Connection
**GET** `/test-db`

**Description:** Test the database connection.

**Response:**
```json
{
  "message": "Database connection successful!",
  "result": 2
}
```

### User Management

#### Fetch all users
**GET** `/api/users`

**Description:** Fetch all users.

**Response:**
```json
[
  { "id": 1, "name": "John Doe", "email": "john@example.com" },
  { "id": 2, "name": "Jane Doe", "email": "jane@example.com" }
]
```

#### Add a new user
**POST** `/api/users`

**Description:** Add a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "message": "User added",
  "id": 3
}
```

---

## Error Handling

The API uses centralized error handling. If an error occurs, the response will include:
- `success: false`
- `message: Error message.`

**Example:**
```json
{
  "success": false,
  "message": "Name and email are required"
}
```

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Customization
- Update the **Features** section if you add new functionality.
- Add more details to the **Setup** section for additional steps.
- Include screenshots or examples in the **API Endpoints** section or trello if needed.
