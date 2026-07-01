const calSum = require("./calculatorSum"); // Import custom module

function requestHandler(req, res) {
  // Called once for every incoming HTTP request

  if (req.url === "/" && req.method === "GET") {
    // Handle GET request for home page

    res.setHeader("Content-Type", "text/html"); // Tell browser that response body contains HTML

    return res.end(`
      <html>
        <head>
          <title>CALCULATOR</title>
        </head>
        <body>
          <h1>WELCOME to CALCULATOR.</h1>
          <a href="/calculator">Calculate</a>
        </body>
      </html>
    `); // Send response and stop execution of this request
  } else if (req.url === "/calculator") {
    // Handle request for calculator page

    res.setHeader("Content-Type", "text/html"); // Tell browser that response body contains HTML

    return res.end(`
      <html>
        <head>
          <title>calculator-result</title>
        </head>
        <body>
          <form method="POST" action="/calculate-result">
            <input type="number" name="num1">
            <span>+</span>
            <input type="number" name="num2">
            <button type="submit">SUM</button>
          </form>
        </body>
      </html>
    `); // Send calculator form and stop execution
  } else if (req.url === "/calculate-result" && req.method === "POST") {
    calSum(req, res); // Delegate request processing to another function
  }
}

module.exports = requestHandler; // Export function so other files can use it
