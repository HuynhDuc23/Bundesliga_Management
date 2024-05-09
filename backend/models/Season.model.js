import mongoose from "mongoose";

const seasonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    yearStart: {
        type: Number,
        required: true
    },
    yearEnd: {
        type: Number,
        required: true
    }
});


const Season = mongoose.model("Season", seasonSchema);

export default Season;
