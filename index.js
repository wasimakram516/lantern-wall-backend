// index.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

// WebSocket events
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("triggerLantern", (data) => {
    console.log("Lantern trigger received:", data);
    socket.broadcast.emit("lanternEvent", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Basic health route
app.get("/", (req, res) => {
  res.send("Lantern Wall WebSocket server is running.");
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
