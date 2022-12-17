const express = require('express');
const router = express.Router();

const { login } = require("../controllers/auth.js");


// if !verifytoken then "/" = login
// else  
router.post("/login", login);

/* ROUTES WITH FILES 
when /auth/register is hit
we use middleware upload.single("picture") to upload to /assets before we
register (the controller) the user
multer upload function needs to be above this line in order for upload() to access it */
// app.post("/auth/register", upload.single("picture"), register)

module.exports = router;