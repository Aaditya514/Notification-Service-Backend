# 📬 Notification Service Backend

A robust notification microservice built with **Node.js**, **Express.js**, **MongoDB**, and **Redis** that supports multiple notification channels like **Email** and **SMS**, along with a retry mechanism for failed messages.

---

## 🚀 Features

- ✅ Send **Email** or **SMS** notifications
- 📦 Queue-based architecture using **Redis**
- 🔁 **Retry mechanism** for failed notifications (max 3 attempts)
- 🛠️ Modular, production-ready structure with **ES Modules**
- 🧪 Easily extensible for in-app or push notifications
- 📊 MongoDB used to store notification history

---

## 🏗️ Tech Stack

| Technology | Usage |
|-----------|--------|
| **Node.js** | Backend runtime |
| **Express.js** | REST API framework |
| **MongoDB** | Stores notification logs |
| **Mongoose** | ODM for MongoDB |
| **Redis** | Message queue for background jobs |
| **Nodemailer** | Sending emails |
| **Twilio** | Sending SMS messages |
| **ES Modules** | Clean and modern import/export support |

---

## 📁 Project Structure

```
src/
├── config/              # MongoDB connection
├── controllers/         # Request handlers
├── models/              # Mongoose models
├── routes/              # API route definitions
├── services/            # Notification & SMS logic
├── utils/               # Redis and Email clients
├── worker/              # Background job processor
└── app.js               # Entry point
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root with the following:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/notifications
REDIS_URL=redis://localhost:6379

EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password

TWILIO_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE=your-twilio-phone-number
```

> **Note:** Use application-specific passwords for Gmail or service credentials for production.

---

## 🧪 API Endpoints

### `POST /api/notifications`
Send a notification (SMS or Email).

#### Body:
```json
{
  "userId": "12345",
  "type": "sms",
  "message": "Hello!",
  "userPhone": "+1234567890"
}
```

---

### `GET /api/users/:id/notifications`
Fetch all notifications for a user.

---

## 🔄 Background Worker

A background job runs every second to:

- Pull jobs from Redis queue
- Attempt delivery (email/SMS)
- Retry up to 3 times before marking as failed

### Run the worker:

```bash
node ./src/worker/notificationWorker.js
```

---

## 🧑‍💻 Run the App Locally

```bash
# Install dependencies
npm install

# Start server
npm run start

# In another terminal, start the worker
node ./src/worker/notificationWorker.js
```

---

## 🛠️ Todo / Future Improvements

- [ ] Add unit tests with Jest
- [ ] Swagger/OpenAPI documentation
- [ ] In-app and push notifications
- [ ] Dashboard UI (frontend)

---

## 📝 License

MIT © [Aaditya514](https://github.com/Aaditya514)
