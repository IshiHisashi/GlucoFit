import { Schema, model, Document, ObjectId } from "mongoose";

export interface IMedicineLog extends Document {
  user_id: ObjectId;
  amount: number;
  injection_time: Date;
}

const medicineLogSchema = new Schema<IMedicineLog>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  injection_time: { type: Date, required: true },
});

export const MedicineLog = model<IMedicineLog>("MedicineLog", medicineLogSchema);
