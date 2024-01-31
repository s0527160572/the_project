import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    const mongoURI =
      process.env.DB_CONNECTION ||
      "mongodb+srv://csy:j6sQIeFhqY3STTQ@theproject.06dzkwt.mongodb.net/databaseName?replicaSet=myreplicaset";

    const con = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("mongodb connected on host: " + con.connection.host);
  } catch (err) {
    console.log(err);
    console.log("cannot connect to MongoDB");
    process.exit(1);
  }
};
