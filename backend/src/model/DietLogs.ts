import { Schema, model, Document } from "mongoose";

interface Note {
  note_title: string;
  note_description: string;
}

export interface IDietLogs extends Document {
  userID: string;
  note: Note;
  carbs: number;
  log_timestamp: Date;
}

const dietLogsSchema = new Schema<IDietLogs>({
  userID: { type: String, required: true },
  note: { type: Object },
  carbs: { type: Number, required: true },
  log_timestamp: { type: Date, required: true },
});

export const DietLogs = model<IDietLogs>("DietLogs", dietLogsSchema);
