import mongoose from "mongoose";
import { User } from "../interfaces/User";
import UserSchema from "../schemas/userSchema";

const User = mongoose.model<User>("User", UserSchema);
export default User;
