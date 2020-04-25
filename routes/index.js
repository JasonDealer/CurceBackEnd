const express = require('express');

const router = express.Router();
const authorizationRoutes = require('./authorization.routes');
const adminRoutes = require('./admin.routes');
const userRoutes = require('./user.routes');

router.use('/authorization', authorizationRoutes);
router.use('/user', userRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
