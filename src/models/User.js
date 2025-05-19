import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: String,
  phone: String,
  preferences: {
    email: Boolean,
    sms: Boolean,
    inApp: Boolean
  }
});

export default mongoose.model('User', userSchema);
