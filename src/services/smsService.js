import twilio from 'twilio';
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } from '../config/index.js';

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export const sendSMS = async (to, message) => {
  try {
    const res = await client.messages.create({
      body: message,
      from: TWILIO_PHONE_NUMBER,
      to,
    });
    console.log(`✅ SMS sent to ${to}: ${res.sid}`);
    return res;
  } catch (error) {
    console.error(`❌ Failed to send SMS to ${to}:`, error.message);
    throw error;
  }
};
