import { Schema, model, Document } from "mongoose";

interface BadgeCriteria {
  value: number;
  comparison: string;
  kind: string;
  note: string;
}

export interface IBadges extends Document {
  badge_name: string;
  badge_desc: string;
  badge_image_address: string;
  criteria: BadgeCriteria;
  last_updated: Date;
}

const badgesSchema = new Schema<IBadges>({
  badge_name: { type: String, required: true },
  badge_desc: { type: String, required: true },
  badge_image_address: { type: String, required: true },
  criteria: { type: Object },
  last_updated: { type: Date },
});

export const Badges = model<IBadges>("Badges", badgesSchema);
