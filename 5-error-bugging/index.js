const http = require("http");

function requestListener(req, res) {
  console.log(req.url);
  //   console.log(x);//runtime error
  //   console.log("Hello);//syntax error
  //   let num = 10;
  //   num();//logical error
  if(4 === 4){//for debugging
    console.log("Hello world");
  }
  else{
    console.log("Learning nodejs");
  }
}

const server = http.createServer(requestListener);

server.listen(3001, () => console.log("Server start"));
