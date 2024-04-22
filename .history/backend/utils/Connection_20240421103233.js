import mongoose, { connect } from "mongoose";
const connection =  (url){
    try {
        connect(url);
        console.log("Successfully connected")
    } catch (error) {
        console.log("Couldn't connect")
    }
}
export default connection;