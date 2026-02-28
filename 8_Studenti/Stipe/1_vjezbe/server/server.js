const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = {}; // Spremit će ID-eve korisnika i dodijeljene brojeve

io.on("connection", (socket) => {
  const userNumber = Object.keys(users).length + 1; // Dodjeljuje broj novom korisniku
  users[socket.id] = userNumber;

  console.log(`Korisnik ${userNumber} povezan`);

  socket.on("message", (msg) => {
    io.emit("message", { user: `Osoba ${users[socket.id]}`, text: msg });
  });

  socket.on("disconnect", () => {
    console.log(`Osoba ${users[socket.id]} je napustila chat`);
    delete users[socket.id]; // Briše korisnika kad se odspoji
  });
});

server.listen(5000, () => {
  console.log("Server radi na portu 5000");
});
