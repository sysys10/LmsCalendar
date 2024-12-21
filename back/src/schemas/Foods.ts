import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  food: {
    type: String,
    required: true,
  },
});

export default FoodSchema;
