import mongoose from "mongoose"
import "dotenv/config"

const connectToDb = () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error("MONGO_URI is not defined in the environment variables");
    }

    mongoose.connect(mongoUri, {
        dbName: "secondBrain"
    }).then(() => console.log(`MongoDB connected`))
    .catch((err: any) => console.log(`err in Mongodb Connection`, err));
}

export default connectToDb;