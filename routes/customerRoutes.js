const express = require("express");
const { createCustomer } = require("../controller/customerController");

const router = express.Router();

router.post("/add", createCustomer);

module.exports = router;
