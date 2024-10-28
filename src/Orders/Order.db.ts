// import { Schema, model, Document, Types } from 'mongoose';

// interface IOrder extends Document {
//   userId: Types.ObjectId;
//   product: {
//     name: string;
//     description?: string;
//     price: number;
//   };
//   paymentType: 'MTN MoMo' | 'Cash' | 'Credit Card';
//   deliveryAddress: string;
//   status: 'Pending' | 'Processing' | 'Successful' | 'Failed';
//   createdAt: Date;
// }

// const OrderSchema = new Schema<IOrder>({
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: 'User', // Reference to the User model
//     required: true,
//     index: true, // Makes it easier to search for orders by user
//   },
//   product: {
//     name: { type: String, required: true }, // e.g., "Love Cocoa Coffee Cream Latte"
//     description: { type: String }, // e.g., "Fresh coconut milk, layered with whipped coffee"
//     price: { type: Number, required: true }, // e.g., 30.00
//   },
//   paymentType: {
//     type: String,
//     enum: ['MTN MoMo', 'Cash', 'Credit Card'], // Define the possible payment methods
//     required: true,
//   },
//   deliveryAddress: {
//     type: String,
//     required: true, // e.g., "East Legon"
//   },
//   status: {
//     type: String,
//     enum: ['Pending', 'Processing', 'Successful', 'Failed'],
//     default: 'Pending',
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   }
// });

// export default model<IOrder>('Order', OrderSchema);


// // const mongoose = require('mongoose');

// // Define the Order Schema
// // const OrderSchema = new mongoose.Schema({
// //   userId: { 
// //     type: mongoose.Schema.Types.ObjectId, 
// //     ref: 'Customer', 
// //     required: true 
// //   }, // Reference to the user placing the order
  
// //   items: [{                               // Array of items being ordered
// //     itemId: { 
// //       type: mongoose.Schema.Types.ObjectId, 
// //       ref: 'Item', 
// //       required: true 
// //     }, // Reference to the item
// //     quantity: { 
// //       type: Number, 
// //       required: true 
// //     }, // Quantity of the item
// //   }],
  
// //   paymentType: {
// //     type: String,
// //     enum: ['MTN MoMo', 'Cash', 'Credit Card' ,], // Define possible payment methods
// //     required: true,
// //   },
  
// //   deliveryAddress: {
// //     type: String,
// //     required: true, // Address where the order will be delivered
// //   },
  
// //   status: {
// //     type: String,
// //     enum: ['Pending', 'Processing', 'Successful', 'Failed'],
// //     default: 'Pending', // Default status when the order is created
// //     required: true,
// //   },
  
// //   createdAt: {
// //     type: Date,
// //     default: Date.now, // Timestamp of when the order was created
// //   },
  
// //   updatedAt: {
// //     type: Date,
// //     default: Date.now, // Timestamp of when the order was last updated
// //   },
// // });

// // Export the Order model
// // module.exports = mongoose.model('Order', OrderSchema);

// // import mongoose, { Document, ObjectId } from 'mongoose';

// // // Item interface for schema
// // interface IItem {
// //   name: string;
// //   price: number;
// //   description: string;
// //   quantity?: number;
// // }

// // // Order interface extending mongoose Document
// // interface IOrder extends Document {
// //   items: IItem[];
// //   totalPrice: number;
// //   location: string;
// //   paymentType: string;
// //   paymentStatus: 'pending' | 'completed' | 'failed';
// //   userId: ObjectId; // Reference to User model
// //   createdAt?: Date;
// // }

// // // Create the mongoose schema
// // const orderSchema = new mongoose.Schema({
// //   items: [
// //     {
// //       name: { type: String, required: true },
// //       price: { type: Number, required: true },
// //       description: { type: String, required: true },
// //       quantity: { type: Number, default: 1 }
// //     }
// //   ],
// //   totalPrice: { type: Number, required: true },
// //   location: { type: String, required: true }, 
// //   paymentType: {
// //     type: String,
// //     required: true,
// //     enum: ['card', 'mobile money', 'cash'],
// //     default: 'cash'
// //   },
// //   paymentStatus: {
// //     type: String,
// //     required: true,
// //     enum: ['pending', 'completed', 'failed'],
// //     default: 'pending'
// //   },
// //   userId: { 
// //     type: mongoose.Schema.Types.ObjectId, 
// //     ref: 'Customer',  
// //     required: true 
// //   },
// //   createdAt: { type: Date, default: Date.now }
// // });

// // // Export the model using the IOrder interface
// // const Order = mongoose.model<IOrder>('Order', orderSchema);

// // export default Order;



import { Schema, model, Document, Types } from 'mongoose';

interface IOrder extends Document {
  userId: Types.ObjectId;
  product: {
    name: string;
    description?: string;
    price: number;
  };
  paymentType: 'MTN MoMo' | 'Cash' | 'Credit Card';
  deliveryAddress: string;
  status: 'Pending' | 'Processing' | 'Successful' | 'Failed';
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Customer', // Reference to the User model
    required: true,
    index: true, // Makes it easier to search for orders by user
  },
  product: {
    name: { type: String, required: true }, // e.g., "Love Cocoa Coffee Cream Latte"
    description: { type: String }, // e.g., "Fresh coconut milk, layered with whipped coffee"
    price: { type: Number, required: true }, // e.g., 30.00
  },
  paymentType: {
    type: String,
    enum: ['MTN MoMo', 'Cash', 'Credit Card'], // Define the possible payment methods
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true, // e.g., "East Legon"
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Successful', 'Failed'],
    default: 'Pending',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Order = model<IOrder>('Order', OrderSchema);

export default Order;