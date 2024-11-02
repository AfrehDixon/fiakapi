import mongoose, { Schema, model, Types, Document } from 'mongoose';

export interface Venue extends Document {
  name: string;
  address: string;
  categories: Types.ObjectId[];
}

const VenueSchema = new Schema<Venue>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    categories: [{

    type: mongoose.Schema.Types.ObjectId,

    ref: 'Category',

  }],
  },
  { timestamps: true }
);

export default model<Venue>('Venue', VenueSchema);
