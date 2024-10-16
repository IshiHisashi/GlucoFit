import { Schema, model, Document } from "mongoose";

export interface IDietLogs extends Document {
  userID: string;
  note?: {
    title: string;
    content: string;
  };
  carbs: number;
  log_timestamp: Date;
}

const dietLogsSchema = new Schema<IDietLogs>({
  userID: { type: String, required: true },
  note: {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  carbs: { type: Number, required: true },
  log_timestamp: { type: Date, required: true },
});

export const DietLogs = model<IDietLogs>("DietLogs", dietLogsSchema);
