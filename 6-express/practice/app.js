const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("first middleware", req.method, req.url);
  next();
});

app.use((req, res, next) => {
  console.log("second middleware", req.method, req.url);
  next();
});

// app.use((req, res, next) => {
//   console.log("third middleware", req.method, req.url);
//   res.send("<h1>Welcome to Express.</h1>");
// });

app.get("/", (req, res, next) => {
  console.log("forth middleware", req.method, req.url);
  res.send("<h1>Home page</h1>");
});

app.get("/contact-us", (req, res, next) => {
  console.log("fifth middleware", req.method, req.url);
  res.send(`<h1>Details collection</h1>
    <form action="/contact-us" method="POST">
        <label for="name">NAME : </label>
        <input type="text" id="name" name="name" placeholder="Enter your name"><br>
        
        <label for="email">EMAIL : </label>
        <input type="email" id="email" name="email" placeholder="abc@gmail.com"><br>
        
        <button type="submit">submit</button>
    </form>`);
});

app.post("/contact-us", (req, res, next) => {
  console.log("fifth middleware", req.method, req.url);
  res.send(`<h1>Details submitted successfully....</h1>`);
});

app.listen(3001, () => {
  console.log("SERVER START......");
});
