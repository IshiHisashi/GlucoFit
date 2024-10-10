import { Schema, model, Document, ObjectId } from "mongoose";

export interface IActivityLogs extends Document {
  user_id: ObjectId;
  footsteps: number;
  duration: number;
  log_date: Date;
}

const activityLogsSchema = new Schema<IActivityLogs>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  footsteps: { type: Number, required: true },
  duration: { type: Number, required: true },
  log_date: { type: Date, required: true },
});

export const ActivityLogs = model<IActivityLogs>("ActivityLogs", activityLogsSchema);
