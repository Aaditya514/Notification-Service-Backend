import Notification from '../models/Notification.js';

export const saveInAppNotification = async (userId, message, type) => {
  await Notification.create({ userId, message, type });
};
