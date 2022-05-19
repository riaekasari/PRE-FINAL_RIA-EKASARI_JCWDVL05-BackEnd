const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();



const app = express();

app.use(express.json({ extended: true }));

const connection = require("./src/config");
const router = require("./src/routes");
connection.connect((error) => {
  if (error) {
    console.log("Database connection error: ", error);
  }

  console.log(
    `Database connection is established at ID: ${connection.threadId}`
  );
});


app.use(
  cors({
    origin: "http://localhost:3000",
    // ,
    // exposedHeaders: ["UID", "Auth-Token"],
  })
);

// app.post("/register", (req, res) => {
//   const body = req.body;

//   res.send(body);
// });
app.use("/users", router.userRouter);

const PORT = 2000;
app.listen(PORT, () => {
  console.log("connected to port" + PORT);
});
