const calSum = require("./calculatorSum");

function requestHandler(req, res) {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    return res.end(`<html>
            <head>
                <title>User Input using Response</title>
            </head>
            <body>
                <h1>WELCOME to CALCULATOR.</h1>
                <a href="/calculator">Calculate</a>
            </body>
        </html>`);
  } else if (req.url === "/calculator") {
    res.setHeader("Content-Type", "text/html");
    return res.end(`<html>
            <head>
                <title>User Input using Response</title>
            </head>
            <body>
                <form method="POST" action="/calculate-result">
                    <input type="number" name="num1">
                    <input type="number" name="num2">
                    <button submit="submit">SUM</button>
                </form>
            </body>
        </html>`);
  } else if (req.url === "/calculate-result" && req.method === "POST") {
    res.setHeader("Content-Type", "text/plain");
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", () => {
      const data = Buffer.concat(chunks).toString();
      const params = new URLSearchParams(data);
      const obj = {};
      for(cosnt [key, value] of params.entries()){
        obj[key] = value;
      }
      const result = calSum(obj.num1, obj.num2);
    `<html>
    <head>
        <title>User Input using Response</title>
    </head>
    <body>
        <h3>${obj.num1}+${obj.num2}=${result}</h3>
    </body>
    </html>`
    });
  }
  res.statusCode = 302;
  res.setHeader("Location", "/");
  res.end();
}

module.exports = requestHandler;
