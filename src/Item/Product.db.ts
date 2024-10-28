// // // itemSchema.ts
// // import { Schema, model } from 'mongoose';

// // export interface Item {
// //   name: string;
// //   description?: string;
// //   price: number;
// //   category: 'Coffee Series' | 'Signature' | 'Fruit Teas';
// //   venueId: string;  // Reference to Venue
// // }

// // const ItemSchema: Schema<Item> = new Schema({
// //   name: { type: String, required: true },
// //   description: { type: String },
// //   price: { type: Number, required: true },
// //   category: { type: String, required: true, enum: ['Coffee Series', 'Signature', 'Fruit Teas'] },
// //   venueId: { type: Schema.Types.String}
// // });

// // export default model<Item>('Item', ItemSchema);


// import { Schema, model } from 'mongoose';

// export interface SizeOption {
//   name: string;  // The name of the size
//   price: number; // The price of the size
// }

// export interface Item {
//   name: string;
//   description?: string;
//   category: 'Coffee Series' | 'Signature' | 'Fruit Teas';
//   venueId: string;  // Reference to Venue
//   sizes: SizeOption[]; // Array of size options
//   loyaltyPoints?: number; // Optional loyalty points
// }

// const SizeOptionSchema = new Schema<SizeOption>({
//   name: { type: String, required: true },  // e.g., "BIBIO"
//   price: { type: Number, required: true }, // e.g., 30
// });

// const ItemSchema: Schema<Item> = new Schema({
//   name: { type: String, required: true },
//   description: { type: String },
//   category: { type: String, required: true, enum: ['Coffee Series', 'Signature', 'Fruit Teas'] },
//   venueId: { type: Schema.Types.String, required: true },
//   sizes: { type: [SizeOptionSchema], required: true }, // Include sizes as an array of SizeOption objects
//   loyaltyPoints: { type: Number  ,default: 0} // Include loyaltyPoints with a default value of 0,
// });

// export default model<Item>('Item', ItemSchema);


// import { Schema, model } from 'mongoose';


// export interface SizeOption {
//   name: string;  
//   price: number; 
// }

// export interface Item {
//   name: string;
//   description?: string;
//   category: 'Coffee Series' | 'Signature' | 'Fruit Teas'; 
//   venueId: string;  
//   sizes: SizeOption[]; 
//   loyaltyPoints?: number; 
// }


// const SizeOptionSchema = new Schema<SizeOption>({
//   name: { type: String, required: true }, 
//   price: { type: Number, required: true }, 
// });


// const ItemSchema: Schema<Item> = new Schema({
//   name: { type: String, required: true },
//   description: { type: String },
//   category: { type: String, required: true, enum: ['Coffee Series', 'Signature', 'Fruit Teas'] }, 
//   venueId: { type: Schema.Types.String, required: true }, 
//   sizes: { type: [SizeOptionSchema], required: true }, 
//   loyaltyPoints: { type: Number, default: 0 }, 
// });


// export default model<Item>('Item', ItemSchema);


import { Schema, model, Types } from 'mongoose';

// export interface SizeOption {
//   name: string;  
//   price: number; 
// }

// export interface Product {
//   name: string;
//   description?: string;
//   category: 'Coffee Series' | 'Signature' | 'Fruit Teas'; 
//   CategoryId: Types.ObjectId;  // Changed to ObjectId type
//   sizes: SizeOption[]; 
//   loyaltyPoints?: number; 
// }

// const SizeOptionSchema = new Schema<SizeOption>({
//   name: { type: String, required: true }, 
//   price: { type: Number, required: true }, 
// });

// const ProductSchema: Schema<Product> = new Schema({
//   name: { type: String, required: true },
//   description: { type: String },
//   category: { type: String, required: true, enum: ['Coffee Series', 'Signature', 'Fruit Teas'] }, 
//   CategoryId: { type: Schema.Types.ObjectId, ref: 'Venue', required: true }, // Changed to ObjectId and added ref
//   sizes: { type: [SizeOptionSchema], required: true }, 
//   loyaltyPoints: { type: Number, default: 0 }, 
// });

// export default model<Product>('Product', ProductSchema);


export interface SizeOption {
  name: string;  
  price: number; 
}

export interface Product {
  name: string;
  description?: string;
  category: 'Coffee Series' | 'Signature' | 'Fruit Teas';
  CategoryId: Types.ObjectId;  
  sizes: SizeOption[]; 
  loyaltyPoints?: number;
}

const SizeOptionSchema = new Schema<SizeOption>({
  name: { type: String, required: true }, 
  price: { type: Number, required: true }, 
});

const ProductSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String },
  category: { 
    type: String, 
    required: true, 
    // enum: ['Coffee Series', 'Signature', 'Fruit Teas'] 
  }, 
  CategoryId: { 
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category' // Reference to the category subdocument in Venue
  }, 
  sizes: { type: [SizeOptionSchema], required: true }, 
  loyaltyPoints: { type: Number, default: 0 }, 
}, { timestamps: true });

export default model<Product>('Product', ProductSchema);