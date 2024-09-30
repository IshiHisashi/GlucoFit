import { Schema, model, Document, ObjectId, Decimal128 } from "mongoose";

interface Note {
  note_description: string;
  // would be enhanced later
}

export interface ITestResults extends Document {
  user_id: ObjectId;
  bsl: number;
  note: Note;
  log_timestamp: Date;
  confirmed: boolean;
}

const testResultsSchema = new Schema<ITestResults>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bsl: { type: Number },
  note: { type: Object },
  log_timestamp: { type: Date },
  confirmed: { type: Boolean },
});

export const TestResults = model<ITestResults>(
  "TestResults",
  testResultsSchema
);
