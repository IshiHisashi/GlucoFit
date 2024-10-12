import { Schema, model, Document, ObjectId } from "mongoose";

export interface IMedicineLog extends Document {
  user_id: ObjectId;
  amount: number;
  log_timestamp: Date;
}

const medicineLogSchema = new Schema<IMedicineLog>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  log_timestamp: { type: Date, required: true },
});

export const MedicineLog = model<IMedicineLog>("MedicineLog", medicineLogSchema);
