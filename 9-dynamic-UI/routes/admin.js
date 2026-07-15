const express = require("express");
const adminRouter = express.Router();

adminRouter.post("/submit", (req, res, next) => {
  res.send(`<h1>Application submitted successfully. We will conecct you shortly.......</h1><br>
        <button><a href="/">Return to LOG-IN</a></button>`);
});

module.exports = adminRouter;
