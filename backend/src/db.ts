import mongoose from "mongoose";

async function connectDb() {
  try {
    mongoose.connection.on("connected", () => {
      console.log("DB connected 🔥");
    });
    await mongoose.connect(
      `${process.env.MONGODB_URI}`,
    );
  } catch (error: any) {
    console.log("MONGO_CONNECTION_ERROR", error.message);
  }
}

export default connectDb;
