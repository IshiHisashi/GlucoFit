import { Schema, model, Document } from "mongoose";

export interface IBadges extends Document {
  badge_id: string;
  badge_name: string;
  badge_desc: string;
  badge_image_address: string;
}

const badgesSchema = new Schema<IBadges>({
  badge_id: { type: String, required: true, unique: true },
  badge_name: { type: String, required: true },
  badge_desc: { type: String, required: true },
  badge_image_address: { type: String, required: true },
});

export const Badges = model<IBadges>("Badges", badgesSchema);
