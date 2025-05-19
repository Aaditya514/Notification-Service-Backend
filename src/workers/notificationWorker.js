import mongoose from 'mongoose';
import { redis } from '../utils/redisClient.js';
import Notification from '../models/Notification.js';
import { sendEmail } from '../utils/emailClient.js';
import { sendSMS } from '../services/smsService.js';
import { MONGO_URI } from '../config/index.js';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Worker connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error in worker:', err);
  });

const processNotification = async () => {
  try {
    const job = await redis.rpop('notificationQueue');
    if (!job) return;

    const notification = JSON.parse(job);

    try {
      if (notification.type === 'email') {
        const userEmail = notification.userEmail;
        await sendEmail({
          to: userEmail,
          subject: 'Notification from Your App',
          text: notification.message,
        });
        console.log(`📧 Sent email to ${userEmail}`);
        await Notification.findByIdAndUpdate(notification._id, { status: 'sent' });

      } else if (notification.type === 'sms') {
        if (!notification.userPhone) {
          throw new Error('No phone number provided for SMS notification');
        }
        await sendSMS(notification.userPhone, notification.message);
        console.log(`📱 Sent SMS to ${notification.userPhone}`);
        await Notification.findByIdAndUpdate(notification._id, { status: 'sent' });

      } else {
        console.log(`🔔 In-app notification: ${notification.message}`);
        await Notification.findByIdAndUpdate(notification._id, { status: 'sent' });
      }

    } catch (err) {
      console.error('❌ Notification send failed:', err.message);

      const updated = await Notification.findById(notification._id);

      if (updated) {
        if (updated.retryCount < 3) {
          updated.retryCount += 1;
          await updated.save();
          await redis.lpush('notificationQueue', JSON.stringify(updated));
          console.log(`🔁 Retrying notification ${notification._id} (Attempt ${updated.retryCount})`);
        } else {
          await Notification.findByIdAndUpdate(notification._id, { status: 'failed' });
          console.log(`🚫 Notification ${notification._id} failed after 3 retries.`);
        }
      }
    }
  } catch (e) {
    console.error('❗ Unhandled worker error:', e);
  }
};

setInterval(processNotification, 1000);
