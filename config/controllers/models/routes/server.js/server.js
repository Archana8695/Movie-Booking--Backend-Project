const http = require("http");
const PORT = 9000;

const app = http.createServer((req, res) => {
  if (req.url === "/movies") {
    res.writeHead(200, { contenttype: "text/html" });
    res.write("All Movies Data in JSON format from Mongo DB");
    res.end();
  }
  if (req.url === "/genres") {
    res.writeHead(200, { contenttype: "text/html" });
    res.write("All Genres Data in JSON format from Mongo DB");
    res.end();
  }
  if (req.url === "/artists") {
    res.writeHead(200, { contenttype: "text/html" });
    res.write("All Artists Data in JSON format from Mongo DB");
    res.end();
  }
});

app.listen(PORT, () => {
  console.log("listening to port number ", PORT);
});