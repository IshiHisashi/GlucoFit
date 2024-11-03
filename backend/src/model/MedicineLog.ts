import { Schema, model, Document, ObjectId } from "mongoose";

// Define interface for UserMedicineList (Personal medicine list)
export interface IUserMedicineList extends Document {
  user_id: ObjectId;
  medicine_name: string;
  dosage: string;
  unit: string; // mg, mcg, mL, etc.
  log_timestamp: Date;
}

// Define interface for MedicineLog (Log of medicine intake)
export interface IMedicineLog extends Document {
  user_id: ObjectId;
  medicine_id: ObjectId; // Reference to the specific medicine from UserMedicineList
  amount: number;
  log_timestamp: Date;
}

// Create schema for UserMedicineList
const userMedicineListSchema = new Schema<IUserMedicineList>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  medicine_name: { type: String, required: true },
  dosage: { type: String }, // Dosage amount
  unit: { type: String }, // Unit for dosage (e.g., mg, mL)
  log_timestamp: { type: Date },
});

// Create schema for MedicineLog
const medicineLogSchema = new Schema<IMedicineLog>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  medicine_id: {
    type: Schema.Types.ObjectId,
    ref: "UserMedicineList",
    required: true,
  }, // Reference to UserMedicineList
  amount: { type: Number, required: true }, // Actual amount taken
  log_timestamp: { type: Date, required: true },
});

// Export models
export const UserMedicineList = model<IUserMedicineList>(
  "UserMedicineList",
  userMedicineListSchema
);
export const MedicineLog = model<IMedicineLog>(
  "MedicineLog",
  medicineLogSchema
);
