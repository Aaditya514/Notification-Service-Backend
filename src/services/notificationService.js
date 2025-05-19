import User from '../models/User.js';
import { sendEmail } from './emailService.js';
import { sendSMS } from './smsService.js';
import { saveInAppNotification } from './inAppService.js';

export const handleNotification = async ({ userId, type, message }) => {
  const user = await User.findById(userId);
  if (!user) return;

  if (user.preferences.email) await sendEmail(user.email, `New ${type} Notification`, message);
  if (user.preferences.sms) await sendSMS(user.phone, message);
  if (user.preferences.inApp) await saveInAppNotification(userId, message, type);
};
