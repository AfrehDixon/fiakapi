import { Schema, model, Types } from 'mongoose';

export interface SizeOption {
  name: string;
  price: number;
}

export interface Product {
  image : string;
  name: string;
  description?: string;
  categoryId: Types.ObjectId;
  sizes: SizeOption[];
  loyaltyPoints?: number;
}

const SizeOptionSchema = new Schema<SizeOption>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const ProductSchema = new Schema<Product>(
  {
    image: { type: String },
    name: { type: String, required: true },
    description: { type: String },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    sizes: { type: [SizeOptionSchema], required: true },
    loyaltyPoints: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default model<Product>('Product', ProductSchema);
