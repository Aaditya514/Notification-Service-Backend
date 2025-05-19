# 📚 API Documentation

**Base URL**  
```
http://localhost:3000
```

---

## Endpoints

### ➕ Create a Notification

```
POST /api/notifications
Content-Type: application/json
```

**Request Body**  
```json
{
  "userId": "12345",
  "type": "sms",        
  "message": "Hello!",
  "userPhone": "+1234567890",  
  "userEmail": "a@b.com"       
}
```

**Response (201 Created)**  
```json
{
  "id": "618b1f4a2f8e2c0012345678",
  "userId": "12345",
  "type": "sms",
  "message": "Hello!",
  "status": "queued",
  "attempts": 0,
  "timestamp": "2025-05-19T14:23:22.123Z"
}
```

**Errors**  
- `400 Bad Request` – missing/invalid fields  

---

### 📥 Fetch User Notifications

```
GET /api/users/:id/notifications
```

**Response (200 OK)**  
```json
[
  {
    "id": "618b1f4a2f8e2c0012345678",
    "userId": "12345",
    "type": "sms",
    "message": "Hello!",
    "status": "delivered",
    "attempts": 1,
    "timestamp": "2025-05-19T14:23:22.123Z"
  },
  {
    "id": "618b1f612f8e2c0012345679",
    "userId": "12345",
    "type": "email",
    "message": "Greetings!",
    "status": "failed",
    "attempts": 3,
    "timestamp": "2025-05-19T15:00:00.000Z"
  }
]
```

---

### 🔍 Retrieve a Single Notification

```
GET /api/notifications/:notificationId
```

**Response (200 OK)**  
```json
{
  "id": "618b1f4a2f8e2c0012345678",
  "userId": "12345",
  "type": "sms",
  "message": "Hello!",
  "status": "delivered",
  "attempts": 1,
  "timestamp": "2025-05-19T14:23:22.123Z"
}
```

**Errors**  
- `404 Not Found` – notification not found  

---

### ❌ Delete a Notification

```
DELETE /api/notifications/:notificationId
```

**Response (204 No Content)**  

**Errors**  
- `404 Not Found` – notification not found  

---

## 🔔 Real-Time Delivery (WebSocket)

Subscribe to:

```
ws://localhost:3000
```

Broadcast payload on new notifications:

```json
{
  "id": "618b1f4a2f8e2c0012345678",
  "userId": "12345",
  "type": "sms",
  "message": "Hello!",
  "status": "queued",
  "attempts": 0,
  "timestamp": "2025-05-19T14:23:22.123Z"
}
```
