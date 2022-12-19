const express = require('express');
const AuthRoute = express.Router();

const { login } = require("../controllers/auth.js");


AuthRoute.post("/login", login);

/* ROUTES WITH FILES - for later feature: file upload
when /auth/register is hit
we use middleware upload.single("picture") to upload to /assets before we
register (the controller) the user
multer upload function needs to be above this line in order for upload() to access it */
// app.post("/auth/register", upload.single("picture"), register)

module.exports = AuthRoute;