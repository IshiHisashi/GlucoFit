import { Schema, model, Document, ObjectId } from "mongoose";
import bcrypt from "bcrypt";

// interface Badges {
//   [key: string]: boolean;
// }

interface Badge {
  badgeId: { type: Schema.Types.ObjectId; ref: "Badges" };
  achieved: true;
  progress: number | boolean;
}

export interface IUser extends Document {
  _id: ObjectId;
  name: string;
  birthday: Date; // added
  height: number; // added
  weight: number; // added
  age: number; // no use
  has_onboarded: boolean;
  diabates_type: number;
  email: string;
  phone_number: string; //no use
  password: string;
  maximum_bsl: number;
  minimum_bsl: number;
  bsl_goal: number; // where to use?
  footsteps_goal: number; // where to use?
  test_streak_counter: number; // where to use?
  stable_bsl_counter: number; // where to use?
  notification: boolean;
  latest_log_timestamp: Date;
  last_insulin_intake: Date;
  iHealth_user_id: string; //no use
  iHealth_access_token: string; //no use
  iHealth_refresh_token: String; // no use
  ihealth_device_id: string; // no use
  apple_health_token: string; // no use
  apple_health_id: string; // no use
  android_health_token: string; // no use
  android_health_id: string; // no use
  badges: Badge[];
  read_article_history_array: string[];
  recently_read_articles_array: string[];
  active_status: boolean;
  favourite_articles: string[];
  create_day: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    // required: true,
  },
  birthday: {
    type: Date,
  },
  height: { type: Number },
  weight: { type: Number },
  age: {
    type: Number,
  },
  has_onboarded: { type: Boolean },
  diabates_type: { type: Number },
  email: { type: String },
  phone_number: { type: String },
  password: { type: String },
  maximum_bsl: { type: Number },
  minimum_bsl: { type: Number },
  bsl_goal: { type: Number },
  footsteps_goal: { type: Number },
  test_streak_counter: { type: Number },
  stable_bsl_counter: { type: Number },
  notification: { type: Boolean },
  latest_log_timestamp: { type: Date },
  last_insulin_intake: { type: Date },
  iHealth_user_id: { type: String },
  iHealth_access_token: { type: String },
  iHealth_refresh_token: { type: String },
  ihealth_device_id: { type: String },
  apple_health_token: { type: String },
  apple_health_id: { type: String },
  android_health_token: { type: String },
  android_health_id: { type: String },
  badges: [
    {
      badgeId: { type: Schema.Types.ObjectId, ref: "Badge" },
      achieved: { type: Boolean },
      progress: { type: Number },
      _id: false,
    },
  ],
  read_article_history_array: { type: [String] },
  recently_read_articles_array: { type: [String] },
  active_status: { type: Boolean },
  favourite_articles: { type: [String] },
  create_day: { type: String },
});

const dayMapping: { [key: number]: string } = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  this.create_day = dayMapping[dayOfWeek];

  next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export const User = model<IUser>("User", userSchema);
