import { Schema, model, Document } from "mongoose";

interface Note {
  note_title: string;
  note_description: string;
}

export interface IDietLogs extends Document {
  userID: string;
  note: Note;
  carbs: number;
  time_period: 'Breakfast' | 'Lunch' | 'Dinner' | 'Others';
  log_timestamp: Date;
}

const dietLogsSchema = new Schema<IDietLogs>({
  userID: { type: String, required: true },
  note: { type: Object },
  carbs: { type: Number, required: true },
  time_period: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Others'], required: true },
  log_timestamp: { type: Date, required: true },
});

export const DietLogs = model<IDietLogs>("DietLogs", dietLogsSchema);
