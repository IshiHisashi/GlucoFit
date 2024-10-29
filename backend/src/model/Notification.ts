import { Schema, model, Document, ObjectId } from "mongoose";

export interface INotification extends Document {
  user_id: ObjectId;
  title: string;
  description: string;
  type: string; // e.g., "reminder", "insight"
  createdAt: Date;
  read: boolean;
}

const notificationSchema = new Schema<INotification>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

export const Notification = model<INotification>("Notification", notificationSchema);
