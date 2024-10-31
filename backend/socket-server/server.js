const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const { Server } = require('socket.io');
const http = require('http');

app.use(cors());
const port = 4000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Directory where user code is stored
const codeDirectory = path.join(__dirname, '..', 'code');

io.on('connection', (socket) => {
  console.log('Client connected via Socket.io');

  socket.on('codeUpdate', (code) => {
    console.log('Received code update');

    // Ensure the code directory exists
    if (!fs.existsSync(codeDirectory)) {
      fs.mkdirSync(codeDirectory);
    }

    // Write code to app.js in the code directory
    fs.writeFileSync(path.join(codeDirectory, 'app.js'), code);

    console.log('Code updated in shared volume');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
