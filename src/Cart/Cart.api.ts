import { Elysia, t, Context } from 'elysia';
import Checkout from './Checkout.db';
import ItemDb from '../Item/Product.db';
import QRCode from 'qrcode';

interface CheckoutBody {
  userId: any;
  cartItems: { itemId: string }[];
  totalAmount: number; // Assume total amount is included in the body
}

const app = new Elysia({prefix:'api/checkout'});

app.post('/post', async ({ body }: { body: CheckoutBody }) => {
  try {
    const { cartItems, totalAmount } = body;
    const loyaltyData = [];

    for (const cartItem of cartItems) {
      const item = await ItemDb.findById(cartItem.itemId);
      if (!item) {
        throw new Error("Item not found for cart item.");
      }

      const pointsAwarded = item.loyaltyPoints;
      const qrCodeData = `Item ID: ${cartItem.itemId}, Points: ${pointsAwarded}`;
      const qrCodeUrl = await QRCode.toDataURL(qrCodeData);

      loyaltyData.push({
        itemId: cartItem.itemId,
        points: pointsAwarded,
        qrCode: qrCodeUrl,
      });
    }

    const checkout = new Checkout({
      userId: body.userId,  // Ensure userId is sent in the body
      items: cartItems,
      totalAmount,
    });

    await checkout.save();

    return {
      success: true,
      message: 'Checkout initiated successfully',
      data: loyaltyData,
      checkout,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred',
    };
  }
}, {
  body: t.Object({
    cartItems: t.Array(t.Object({
      itemId: t.String(),
    })),
    totalAmount: t.Number(),
    userId: t.String(), // Ensure userId is provided in the request body
  }),
});

export default app;
