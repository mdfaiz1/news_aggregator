import { app } from "./src/app.js";
import { connectDb } from "./src/config/mongoDb.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch(error => {
    console.error("Failed to start server:", error);
  });
