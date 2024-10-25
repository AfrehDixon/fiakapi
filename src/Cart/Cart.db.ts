import { Schema, model, Document, Types } from 'mongoose';

export interface CartItem extends Document {
  itemId: Types.ObjectId; // Changed to ObjectId type
  quantity: number;
  price: number;
  name: string;
  description: string;
}

const CartItemSchema: Schema<CartItem> = new Schema({
  itemId: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export default model<CartItem>('CartItem', CartItemSchema);