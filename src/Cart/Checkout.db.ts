// models/Checkout.ts
import { Schema, model } from 'mongoose';

const checkoutSchema = new Schema({
    userId: { type: String, required: true },
    items: [
        {
            productId: { type: String, },
            // quantity: { type: Number, required: true },
            // price: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['PENDING', 'PAID'], default: 'PENDING' },
});

const Checkout = model('Checkout', checkoutSchema);

export default Checkout;
