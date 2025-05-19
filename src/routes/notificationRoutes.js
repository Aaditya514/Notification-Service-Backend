import express from 'express';
import { sendNotification, getUserNotifications } from '../controllers/notificationController.js';

const router = express.Router();

router.post('/notifications', sendNotification); // POST /api/notifications
router.get('/users/:id/notifications', getUserNotifications);

export default router;
