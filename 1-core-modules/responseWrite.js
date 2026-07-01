const http = require("http");
const fs = require("fs");

function requestListener(req, res) {
  console.log(req);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>
    <head>
        <title>User Input using Response</title>
    </head>
    <body>
        <form action="/path1" method="POST">
            <h1>Fill the Details....</h1>
            <label for="username">Name : </label>
            <input type="text" id="username" name="username" placeholder="Enter Your name"><br>
            <input type="radio" id="male" name="gender" value="male">
            <label for="male">Male</label>
            <input type="radio" id="female" name="gender" value="female">
            <label for="male">Female</label><br>
            <button type="submit">ok</button>
        </form>
    </body>
</html>`);
    return res.end();
  } else if (req.url === "/path1") {
    res.setHeader("Content-Type", "text/html");
    fs.writeFileSync("test.txt", "redireting file creation : home to /path1 then redirected to /location as it not present so handle by default url. proof is creating this file when visit /path1.")
    res.write(`<html>
      <head><title>Routing Request/path1</title></head>
      <body><h1>Here with another path , another response</h1></body>
    </html>`);
    res.statusCode = 302;
    res.setHeader("Location", '/location');
    res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write(`
  <html>
    <head><title>Routing Request/default</title></head>
    <body>
      <h1>Its default path.</h1>
      <p>Depend on url make diff response.</p>
    </body>
  </html>`);
  res.end();
}

const server = http.createServer(requestListener);

server.listen(3001, () => console.log("Server start"));
