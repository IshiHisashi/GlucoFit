import { Schema, model, Document } from "mongoose";

// Define the interface for Diet Logs
export interface IDietLogs extends Document {
  userID: string;
  note?: string;
  calorieTaken: number;
  logDateTime: Date;
}

// Create the schema for Diet Logs
const dietLogsSchema = new Schema<IDietLogs>({
  userID: { type: String, required: true },
  note: { type: String },
  calorieTaken: { type: Number, required: true },
  logDateTime: { type: Date, required: true },
});

// Export the model
export const DietLogs = model<IDietLogs>("DietLogs", dietLogsSchema);
