// // // venueSchema.ts
// // import mongoose, { Document, Schema } from 'mongoose';

// // // Define the Item interface
// // interface Item extends Document {
// //   name: string;               // e.g., "Love Cocoa Coffee Cream Latte"
// //   description?: string;      // e.g., "Fresh coconut milk, layered with whipped coffee"
// //   price: number;             // e.g., 30.00
// //   category: 'Coffee Series' | 'Signature' | 'Fruit Teas'; // e.g., "Coffee Series"
// // }

// // // Define the Venue interface
// // interface Venue extends Document {
// //   name: string;              // e.g., "THE FIKA TEAHOUSE"
// //   address: string;           // e.g., "12 Tripoli Street, Accra"
// //   items: Item[];             // List of available items
// // }

// // // Define the Item Schema
// // const ItemSchema: Schema<Item> = new Schema({
// //   name: { type: String, required: true },
// //   description: { type: String },
// //   price: { type: Number, required: true },
// //   category: { type: String, required: true, enum: ['Coffee Series', 'Signature', 'Fruit Teas'] },
// // });

// // // Define the Venue Schema
// // const VenueSchema: Schema<Venue> = new Schema({
// //   name: { type: String,},
// //   address: { type: String, },
// //   // items: [ItemSchema], // List of available items
// // });

// // // Export the Venue model
// // export default mongoose.model<Venue>('Venue', VenueSchema);






// // import mongoose, { Document, Schema } from 'mongoose';

// // // Define the Venue interface
// // interface Venue extends Document {
// //   name: string;             
// //   address: string;           
// //   categories: string[];    
// // }

// // // Define the Venue Schema
// // const VenueSchema: Schema<Venue> = new Schema({
// //   name: { type: String, required: true },  // Make name required
// //   address: { type: String, required: true }, // Make address required
// //   categories: { type: [String], required: true }, // Array of categories for the venue
// // });

// // // Export the Venue model
// // export default mongoose.model<Venue>('Venue', VenueSchema);


// // venueSchema.ts
// // import { Schema, model } from 'mongoose';

// // export interface Venue {
// //   name: string;
// //   address: string;
// //   categories: {
// //     _id: any; name: string; items: string[] 
// // }[]; 
// // }

// // const VenueSchema: Schema<Venue> = new Schema({
// //   name: { type: String, required: true },
// //   address: { type: String, required: true },
// //   categories: [
// //     {
// //       name: { type: String, required: true },
// //       items: [{ type: Schema.Types.String, ref: 'Product' }], // Reference to items
// //     },
// //   ],
// // });

// // export default model<Venue>('Venue', VenueSchema);

// import { Schema, model, Types } from 'mongoose';

// interface Category {
//   _id?: Types.ObjectId;
//   name: string;
//   items: Types.ObjectId[];
// }

// export interface Venue {
//   name: string;
//   address: string;
//   categories: Category[];
// }

// const CategorySchema = new Schema<Category>({
//   name: { type: String, required: true },
//   items: [{ 
//     type: Schema.Types.ObjectId, 
//     ref: 'Product' 
//   }]
// });

// const VenueSchema = new Schema<Venue>({
//   name: { type: String, required: true },
//   address: { type: String, required: true },
//   categories: [CategorySchema]
// }, { timestamps: true });

// export default model<Venue>('Venue', VenueSchema);


import { Schema, model, Types, Document } from 'mongoose';

// Define the Category interface
interface Category {
  _id?: Types.ObjectId;  // Optional ObjectId, useful for MongoDB referencing
  name: string;
  items: Types.ObjectId[]; // Array of ObjectIds that reference 'Product'
}

// Define the Venue interface, which includes an array of categories
interface Venue extends Document {
  name: string;
  address: string;
  categories: Category[];
}

// Define the Category schema
const CategorySchema = new Schema<Category>({
  name: { type: String, required: true },
  items: [{
    type: Types.ObjectId,
    ref: 'Product',  // Reference to Product model
    required: true,
  }]
});

// Define the Venue schema with categories as subdocuments
const VenueSchema = new Schema<Venue>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  categories: { type: [CategorySchema], required: true }, // Array of categories, required for consistency
}, { timestamps: true }); // Auto-generated createdAt and updatedAt

export default model<Venue>('Venue', VenueSchema);
