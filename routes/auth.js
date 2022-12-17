const express = require('express');
const login = require("../controllers/auth.js");
const router = require('./user');

router.post("/login", login);

module.exports = router;