const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let selectedColor = "lightblue";
let userName = "Friend";

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <html>
  <head>
    <title>Color Picker Fun!</title>
    <style>
      body { 
        background-color: ${selectedColor};
        
      }
       
    </style>
  </head>
  <body>
    <div class="container">
      <h1>hi ${userName}!</h1>
      <p>Pick your favorite color and watch the magic happen!</p>
      <form method="POST">
        <div>
          <label>Your Name:</label><br>
          <input name="userName" value="${userName}" placeholder="Enter your name">
        </div>
        <div>
          <label>Choose a Color:</label><br>
          <select name="color">
            <option value="lightblue" ${selectedColor === 'lightblue' ? 'selected' : ''}>Light Blue</option>
            <option value="lightgreen" ${selectedColor === 'lightgreen' ? 'selected' : ''}>Light Green</option>
            <option value="lightcoral" ${selectedColor === 'lightcoral' ? 'selected' : ''}>Light Coral</option>
            <option value="lightyellow" ${selectedColor === 'lightyellow' ? 'selected' : ''}>Light Yellow</option>
            <option value="lightpink" ${selectedColor === 'lightpink' ? 'selected' : ''}>Light Pink</option>
            <option value="lavender" ${selectedColor === 'lavender' ? 'selected' : ''}>Lavender</option>
          </select>
        </div>
        <button type="submit">Change Color!</button>
      </form>
      <p style="margin-top: 30px; color: #666;">Current color: <strong>${selectedColor}</strong></p>
    </div>
  </body>
  </html>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic
      if (body["userName"]) {
        userName = body["userName"].replace(/\+/g, ' ');
      }
      if (body["color"]) {
        selectedColor = body["color"];
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.on("request", (req) => {
  console.log("event received: ", req.method, req.url);
});

server.listen(3000);
console.log("The server is listening on port 3000.");
