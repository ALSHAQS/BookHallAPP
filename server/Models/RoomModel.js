import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  description: { type: String }
});

const RoomModel = mongoose.model("Room", RoomSchema);
export default RoomModel;