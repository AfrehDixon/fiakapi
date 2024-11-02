import { Schema, model, Types } from 'mongoose';

export interface Category {
  _id?: Types.ObjectId;
  name: string;
  venue: Types.ObjectId;
  items: Types.ObjectId[];
}

const CategorySchema = new Schema<Category>(
  {
    name: { type: String, required: true },
    venue: { type: Schema.Types.ObjectId, ref: 'Venue', required: true },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export default model<Category>('Category', CategorySchema);
