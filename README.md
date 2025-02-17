# Cinema Ticket Purchasing API

A **Cinema Ticket Purchasing Web API** built with **Node.js**, **TypeScript**, and **MongoDB**, allowing users to:

- Create cinemas with a given number of seats.
- Purchase specific seats or two consecutive seats.
- Ensure concurrency handling to prevent multiple bookings of the same seat.

## Features

- ✅ Create cinemas dynamically with N seats.
- ✅ Purchase specific seats in a cinema.
- ✅ Purchase **two consecutive** available seats.
- ✅ Handles concurrent seat booking safely.

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/matrix-marketers/cinema-ticket-purchasing-app.git
cd cinema-ticket-purchasing-app
```

### Install Dependencies

npm install

### Create a .env File

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/cinema_db
```

### Start the Server

npm start

# API Endpoints

### Create a Cinema with N Seats

Endpoint:

```bash
POST /api/cinemas/create
```

Payload:

```bash
{
  "seatCount": 6
}
```

Response:

```bash
{
  "cinemaId": "<cinemaID>"
}
```

### Purchase a Specific Seat

Endpoint:

```bash
 POST /api/cinemas/:cinemaId/purchase
```

Payload:

```bash
{
  "seatNumber": 3
}
```

Response:

```bash
{
  "message": "Seat booked successfully",
  "seat": { "number": 3, "isBooked": true }
}
```

Errors:

```bash
404 Cinema not found
400 Invalid seat number
400 Seat already booked
```

### Purchase 2 Consecutive Seats

Endpoint:

```bash
 POST /api/cinemas/:cinemaId/purchaseConsecutive
```

Payload:

```bash
{
  "seatCount": 2
}
```

Response:

```bash
{
  "message": "Two consecutive seats booked successfully",
  "seats": [
    { "number": 2, "isBooked": true },
    { "number": 3, "isBooked": true }
  ]
}
```

Errors:

```bash
404 Cinema not found
400 No two consecutive seats available
```

### Requirements

```bash
Node.js 20.10.0
MongoDB (Local or Cloud)
Postman (For API testing)
```
