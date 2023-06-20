const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    //mongoDB connection
    const con = await mongoose.connect(
      "mongodb+srv://sinumang20:Samusha1@clusterdonor.zace8d0.mongodb.net/DonorForNGOs",
      {
        useNewUrlParser: true,
      }
    );
    console.log("MongoDB connected:");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectDB;
