const fs = require("fs");
const https = require("https");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const createError = require("http-errors");

const app = express();

// HTTPS 옵션
const options = {
  key: fs.readFileSync("C://cert/private.key"),
  cert: fs.readFileSync("C://cert/certificate.crt"),
  ca: fs.readFileSync("C://cert/ca_bundle.crt"),
};


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());


const PORT = 3001;
const server = https.createServer(options, app);


const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  console.log("클라이언트 접속됨:", socket.id);

  socket.on("cliMsg", (msgObj) => {
    console.log("클라이언트 메시지:", msgObj);
    io.emit("srvMsg", msgObj); 
  });

  socket.on("McliMsg", (msgObj) => {
    console.log("M클라이언트 메시지:", msgObj);
    io.emit("MsrvMsg", msgObj);
  });
});

// 404 처리
app.use((req, res, next) => {
  next(createError(404));
});

// 에러 핸들러
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// 서버 시작
server.listen(PORT, () => {
  console.log(`HTTPS + Socket.IO 서버가 ${PORT} 포트에서 실행 중입니다.`);
});
