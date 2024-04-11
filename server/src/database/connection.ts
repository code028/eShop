import mongoose from "mongoose";

const connection_string = process.env.CONNECTION_STRING;

const connectionDB = async () => {
    await mongoose.connect(connection_string!);
    console.log("\n\tNotifications:\n\t ‣ database connected");
}

export default connectionDB