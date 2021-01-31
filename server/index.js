const http = require("http");
const socketIo = require("socket.io");

const server = http.
  createServer((request, response) => {
    response.writeHead(204, {
      "Acess-Control-Allow-Origin": "*",
      "Acess-Controll-Allow-Methods": "OPTIONS, POST, GET",
    });

    response.end("Hey There");
  });

const io = socketIo(server, {
  cors: {
    origin: "*",
    credentials: false,
  },
});

io.on("connection", socket => {
  console.log("connection", socket.id);

  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    
    socket.to(roomId).broadcast.emit("user-connected", userId);

    socket.on("disconnect", () => {
      console.log("Disconnected!", roomId, userId);

      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });
});

const startServer = () => {
  const { adress, port } = server.address();

  console.info(`App running at ${adress || "localhost"}:${port}`);
};

server.listen(process.env.PORT || 3000, startServer);