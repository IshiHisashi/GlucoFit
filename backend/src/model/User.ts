// src/models/User.ts

import { Schema, model, Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  name: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
});

export const User = model<IUser>("User", userSchema);
