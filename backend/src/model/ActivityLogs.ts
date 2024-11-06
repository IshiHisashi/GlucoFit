import { Schema, model, Document, ObjectId } from "mongoose";

export interface IActivityLogs extends Document {
  user_id: ObjectId;
  footsteps: number;
  activityType: { 
    type: String, 
    enum: ['Walking', 'Running', 'Cycling', 'Others'],
    required: true
  },  
  duration: number;
  log_timestamp: Date;
}

const activityLogsSchema = new Schema<IActivityLogs>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  footsteps: { type: Number},
  activityType: { 
    type: String, 
    enum: ['Walking', 'Running', 'Cycling', 'Others'],
    required: true
  },  
  duration: { type: Number, required: true },
  log_timestamp: { type: Date, required: true },
});

export const ActivityLogs = model<IActivityLogs>("ActivityLogs", activityLogsSchema);
