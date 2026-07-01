function calSum(req, res) {
  //call only once

  const chunks = [];

  req.on("data", (chunk) => {
    // Request body arrives as a stream.this part handle by event loop for future chunk
    //program doesn't hold here, event loop assign a loop to handle this part , program move forword.
    chunks.push(chunk);
  });

  req.on("end", () => {
    //program need to be wait until 'end' chunk is received

    // Fired once when all chunks have been received.

    const data = Buffer.concat(chunks).toString();

    // Combine all Buffer chunks into one Buffer,
    // then convert Buffer into a string.

    const params = new URLSearchParams(data);
    const obj = {};
    for (const [key, value] of params.entries()) {
      obj[key] = value;
    }

    const result = Number(obj.num1) + Number(obj.num2);

    console.log(result);

    res.setHeader("Content-Type", "text/html"); // Tell browser that response body contains HTML
    res.write(`
        <html>
          <head>
            <title>User Input using Response</title>
          </head>
          <body>
            <h3>${obj.num1}+${obj.num2}=${result}</h3><br>
            <a href="/">Go to home</a>
          </body>
        </html>
      `); // Write HTML content to response body
    return res.end(); // Send response completely and close this request
  });
}

module.exports = calSum; // Export function so other files can use it
