import { Schema, model, Document, ObjectId } from "mongoose";

export interface IActivityLogs extends Document {
  user_id: ObjectId;
  footsteps: number;
  duration: number;
  time_period: string;
  log_timestamp: Date;
}

const activityLogsSchema = new Schema<IActivityLogs>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  footsteps: { type: Number},
  duration: { type: Number, required: true },
  time_period: { type: String},
  log_timestamp: { type: Date, required: true },
});

export const ActivityLogs = model<IActivityLogs>("ActivityLogs", activityLogsSchema);
