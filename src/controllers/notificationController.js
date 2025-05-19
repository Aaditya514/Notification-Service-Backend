import Notification from '../models/Notification.js';
import { redis } from '../utils/redisClient.js';

export const sendNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    await redis.lpush('notificationQueue', JSON.stringify(notification));
    res.status(201).json({ message: 'Notification queued', id: notification._id });
  } catch (err) {
    console.error('❌ Error in sendNotification:', err);
    res.status(500).json({ error: 'Failed to send notification' });
  }
};

export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.params.id;
    const notifications = await Notification.find({ userId });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};
