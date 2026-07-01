const http = require("http"); // Import HTTP module
const fs = require("fs"); // Import File System module

function requestListener(req, res) {
  console.log("1. requestListener() called for a new HTTP request.");
  const obj = {}; // Empty object created for this request
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html"); // Tell browser response contains HTML
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
    console.log("2. home response end");
    return res.end(); // Send response and finish this request
  } else if (req.url === "/path1" && req.method === "POST") {
    console.log("3. /path1 route matched.");
    const chunks = []; // Intended to store incoming request body chunks
    req.on("data", (chunk) => {
      // This callback would run whenever a chunk is received
      chunks.push(chunk);
    });
    req.on("end", () => {
      // This callback would run after all chunks are received
      const d = Buffer.concat(chunks).toString();
      const params = new URLSearchParams(d);
      for (const [key, value] of params.entries()) {
        obj[key] = value;
      }
      fs.writeFile("test.txt", JSON.stringify(obj), (error) => {
        // file not written immedieatly
        console.log("4. file written done.");
      });
      console.log("5. file writing processing......");
      res.setHeader("Content-Type", "text/html"); // Tell browser response contains HTML
      res.write(`<html>
        <head><title>Routing Request/path1</title></head>
        <body>
          <p>Data store at file "test.txt"</p>
          <a href="/">Go to home</a>
        </body>
      </html>`);
      console.log("6. path1 response end");// in Async code file written yet not complete but in browser it show written complete.
      return res.end(); // Finish response
    });
  } else {
    res.statusCode = 404;
    res.end("Page Not Found");
  }
}

const server = http.createServer(requestListener);

server.listen(3001, () => console.log("Server start"));
