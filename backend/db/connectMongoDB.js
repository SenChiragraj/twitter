import mongoose from "mongoose";

export const connect = () => {
  mongoose.connect('mongodb://127.0.0.1:27017/discord').then(
    console.log('Connected🫡')
  )
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};
