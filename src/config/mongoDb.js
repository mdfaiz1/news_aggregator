import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    const dbName = process.env.DB_NAME;
    const connection = await mongoose.connect(`${mongoUri}/${dbName}`);
    console.log("Connected to MongoDB:", connection.connection.host);
  } catch (error) {
    concole.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

export { connectDb };
