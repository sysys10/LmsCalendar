import mongoose from "mongoose";
import FoodSchema from "../schemas/Foods";
import { Food } from "../interfaces/Food";

const Food = mongoose.model<Food>("Food", FoodSchema);
export default Food;
