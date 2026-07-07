const express = require("express");

const app = express();

// ===========================
// Global Middleware
// Runs for every request
// ===========================
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ===========================
// Route Middleware
// Runs only for /admin
// ===========================
app.use("/admin", (req, res, next) => {
  console.log("Admin Middleware");
  next();
});

// ===========================
// GET Request
// ===========================
app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

// ===========================
// HTML Form
// ===========================
app.get("/form", (req, res) => {
  res.send(`
    <form action="/submit" method="POST">
      <input type="text" name="username">
      <button type="submit">Send</button>
    </form>
  `);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());//for parsing json

// ===========================
// POST Request
// ===========================
app.post("/submit", (req, res) => {
  console.log(req);

//   res.send('<h2>Form submitted</h2>');
  res.send(`
    <h2>Form Submitted</h2>
     <p>${req.body.username}</p>
  `);
});

// ===========================
// Start Server
// ===========================
app.listen(3001, () => {
  console.log("Server Started");
});