const http = require("http");
const fs = require("fs");

function requestListener(req, res) {
  console.log("1. requestListener() called for a new HTTP request.");

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>
    <head>
        <title>File write with async operation</title>
    </head>
    <body>
        <form action="/path1" method="POST">
            <h1>Fill the Details....</h1>
            <label for="username">Name : </label>
            <input type="text" id="username" name="username" placeholder="Enter Your name"><br>

            <input type="radio" id="male" name="gender" value="male">
            <label for="male">Male</label>

            <input type="radio" id="female" name="gender" value="female">
            <label for="female">Female</label><br>

            <button type="submit">ok</button>
        </form>
    </body>
    </html>`);
    console.log("2. Home response sent.");
    return res.end();
  }
  else if (req.url === "/path1" && req.method === "POST") {
    console.log("3. /path1 POST route matched.");
    const chunks = []; // Store request body chunks
    req.on("data", (chunk) => {
      // Called once for every incoming chunk
      chunks.push(chunk);
    });
    req.on("end", () => {
      // Called once after all chunks are received
      const d = Buffer.concat(chunks).toString();
      const params = new URLSearchParams(d);
      const obj = {};
      for (const [key, value] of params.entries()) {
        // Convert URLSearchParams into a normal JavaScript object
        obj[key] = value;
      }
      fs.writeFileSync("test.txt", JSON.stringify(obj));
      console.log("4. File written successfully.");
      res.setHeader("Content-Type", "text/html");
      res.write(`<html>
        <head><title>Routing Request/path1</title></head>
        <body>
          <p>Data stored in test.txt</p>
          <a href="/">Go to home</a>
        </body>
      </html>`);
      console.log("5. /path1 response sent.");
      return res.end();
    });
    return;
  }
  res.statusCode = 404;
  res.end("Page Not Found");
}

const server = http.createServer(requestListener);

server.listen(3001, () => {
  console.log("Server start");
});