import app from "./app.js";
import mongoose from "mongoose";
import connection from "./database/connection.js";

//connecting to server
connection().then(
    console.log('connecting...')
).catch(err => console.log(err));

mongoose.connection.once('open', () => {
    app.listen(process.env.PORT, () => {
        console.log(`server in running on port :${process.env.PORT}`);
    })
});

mongoose.connection.on('error', err => {
    console.log(err);
});
