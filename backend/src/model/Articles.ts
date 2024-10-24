import { Schema, model, Document } from "mongoose";

export interface IArticles extends Document {
  _id: string;
  article_name: string;
  article_thumbnail_address: string;
  article_desc: string;
  article_url: string;
  article_genre: string;
  diabetes_type: string;
}

const articlesSchema = new Schema<IArticles>({
  article_name: { type: String, required: true },
  article_thumbnail_address: { type: String, required: true },
  article_desc: { type: String, required: true },
  article_url: { type: String, required: true },
  article_genre: { type: String, required: true },
  diabetes_type: { type: String, required: true },
});

export const Articles = model<IArticles>("Articles", articlesSchema);
