import Cart from './Cart.db';
import ItemDb from '../Item/Product.db';
import { Context } from 'elysia';

interface CheckoutBody {
  cartItems: { itemId: string }[];
}
import QRCode from 'qrcode';



const checkout = async (context: Context) => {
  const { body } = context;
  const { cartItems } = body as CheckoutBody;
  try {
    const loyaltyData = [];

    for (const cartItem of cartItems) {
      const item = await ItemDb.findById(cartItem.itemId);
      if (!item) {
        throw new Error("Item not found for cart item.");
      }

      const pointsAwarded = item.loyaltyPoints;
      const qrCodeData = `Item ID: ${cartItem.itemId}, Points: ${pointsAwarded}`;
      const qrCodeUrl = await QRCode.toDataURL(qrCodeData); // Generate QR code

      loyaltyData.push({
        itemId: cartItem.itemId,
        points: pointsAwarded,
        qrCode: qrCodeUrl,
      });
    }



    return {
      success: true,
      message: "Checkout successful",
      // totalPrice: totalPrice, // Accept total price from the frontend
      data: loyaltyData,
    };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};

export {  checkout };


