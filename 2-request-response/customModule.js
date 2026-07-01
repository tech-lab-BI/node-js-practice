function requestHandler(req, res) {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    return res.end(`<html>
      <head>
          <title>User Input using Response</title>
      </head>
      <body>
          <nav>
              <form method="POST" action="/details">
                  <label for="name">Name : </label>
                  <input type="text" id="name" name="name" placeholder="Enter your name"><br>
                  <input type="radio" id="male" name="gender" value="male">
                  <label for="male">Male</label>
                  <input type="radio" id="female" name="gender" value="female">
                  <label for="female">Female</label><br>
                  <button type="submit">Send</button>
              </form>
          </nav>
      </body>
    </html>`);
  } else if (req.url === "/details" && req.method === "POST") {
    res.setHeader("Location", "/details");
    const data = [];
    req.on("data", (chunk) => {
      data.push(chunk);
    });
    req.on("end", () => {
      const d = Buffer.concat(data).toString();

      const params = new URLSearchParams(d);
      const jsonData = {};
      for (const [key, value] of params.entries()) {
        jsonData[key] = value;
      }

      console.log(d);
      console.log(jsonData);
      console.log(JSON.stringify(jsonData));

      res.end();
    });
    return;
  }
}

module.exports = requestHandler;
