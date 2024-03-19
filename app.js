import express from "express";
import morgan from "morgan";
import cors from "cors";

import contactsRouter from "./routes/contactsRouter.js";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const { DB_HOST, PORT = 4000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful`);
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

// // 8eJWogeZ4MjerDeu Valerii
// import express from "express";
// import morgan from "morgan";
// import cors from "cors";

// // import contactsRouter from "./routes/contactsRouter.js";
// import mongoose from "mongoose";

// import { config } from "dotenv";
// config();

// const { DB_HOST, PORT = 3000 } = process.env;

// mongoose.set("strictQuery", true);

// const app = express();

// app.use(morgan("tiny"));
// app.use(cors());
// app.use(express.json());

// // app.use("/api/contacts", contactsRouter);

// app.use((_, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

// app.use((err, req, res, next) => {
//   const { status = 500, message = "Server error" } = err;
//   res.status(status).json({ message });
// });

// app.listen(PORT, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`);
// });

// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     app.listen((PORT = 3000));
//     console.log("Database connection successful");
//   })
//   .catch((error) => {
//     console.log(error.message);
//     // process.exit(1);
//   });
