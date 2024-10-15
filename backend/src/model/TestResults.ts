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
  time_period: string;
  confirmed: boolean;
}

const testResultsSchema = new Schema<ITestResults>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bsl: { type: Number },
  note: { type: Object },
  log_timestamp: { type: Date },
  time_period: { type: String},
  confirmed: { type: Boolean },
});

export const TestResults = model<ITestResults>(
  "TestResults",
  testResultsSchema
);
