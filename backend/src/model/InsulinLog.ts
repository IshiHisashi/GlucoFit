import { Schema, model, Document, ObjectId } from "mongoose";

export interface IInsulinLog extends Document {
  user_id: ObjectId;
  amount: number;
  injection_time: Date;
}

const insulinLogSchema = new Schema<IInsulinLog>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  injection_time: { type: Date, required: true },
});

export const InsulinLog = model<IInsulinLog>("InsulinLog", insulinLogSchema);
