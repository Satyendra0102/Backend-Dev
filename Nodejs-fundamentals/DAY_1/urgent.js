const http = require("http");
const fs = require("fs");
const url = require("url");

const PORT = 8000;

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/complain")) {
    const queryData = url.parse(req.url, true).query;

    const name = queryData.name;
    const issue = queryData.issue;
    const priority = queryData.priority;

    if (!name || !issue || !priority) { 
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Missing query parameters" }));
      return;
    }

    const ticketId = "TKT-" + Math.floor(Math.random() * 100000);

    const log = `TicketID: ${ticketId}, Name: ${name}, Issue: ${issue}, Priority: ${priority}\n`;

    if (priority.toLowerCase() === "high") {
      fs.appendFileSync("URGENT.txt", log);
    } else {
      fs.appendFileSync("normal_complaints.txt", log);
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        ticketId: ticketId,
        message: "We will solve your issue soon."
      })
    );
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route not found");
  }
});

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});