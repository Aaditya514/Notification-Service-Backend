import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: String,
  userPhone: String,
  type: { type: String, enum: ['email', 'sms', 'in-app'], default: 'in-app' },
  message: String,
  status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
  retryCount: { type: Number, default: 0 },
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
