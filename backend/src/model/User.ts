import { Schema, model, Document, ObjectId } from "mongoose";

interface Badges {
  [key: string]: boolean;
}

export interface IUser extends Document {
  name: string;
  age: number;
  diabates_type: number;
  email: string;
  phone_number: string;
  password_token: string;
  maximum_bsl: number;
  bsl_goal: number;
  footsteps_goal: number;
  test_streak_counter: number;
  stable_bsl_counter: number;
  notification: boolean;
  latest_log_timestamp: Date;
  last_insulin_intake: Date;
  iHealth_access_token: string;
  ihealth_device_iD: string;
  apple_health_token: string;
  apple_health_id: string;
  android_health_token: string;
  android_health_id: string;
  badges: Badges;
  recently_read_articles_array: string[];
  active_status: boolean;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  diabates_type: { type: Number },
  email: { type: String },
  phone_number: { type: String },
  password_token: { type: String },
  maximum_bsl: { type: Number },
  bsl_goal: { type: Number },
  footsteps_goal: { type: Number },
  test_streak_counter: { type: Number },
  stable_bsl_counter: { type: Number },
  notification: { type: Boolean },
  latest_log_timestamp: { type: Date },
  last_insulin_intake: { type: Date },
  iHealth_access_token: { type: String },
  ihealth_device_iD: { type: String },
  apple_health_token: { type: String },
  apple_health_id: { type: String },
  android_health_token: { type: String },
  android_health_id: { type: String },
  badges: { type: Object },
  recently_read_articles_array: { type: [String] },
  active_status: { type: Boolean },
});

export const User = model<IUser>("User", userSchema);