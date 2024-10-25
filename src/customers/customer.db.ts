import { Schema, model, Document } from 'mongoose';

interface PaymentMethod {
  type: 'MTN Mobile Money' | 'Credit Card'| 'Vodafone Cash' | 'Tigo';  // Adding Vodafone Cash as a payment option
  details: {
    phoneNumber?: string;
  };
  default: boolean;
}

interface ICustomer extends Document {
  fullname: string;
  email: string;
  phone: string;
  password: string;
  isPhoneVerified: boolean;
  address: {
    street: string;
    city: string;
  };
  favoriteFlavors: string[];
  paymentMethods: PaymentMethod[];  // PaymentMethods is defined as an array of PaymentMethod
  createdAt: Date;
  updatedAt: Date;
}

const customerSchema = new Schema<ICustomer>({
  fullname: {
    type: String,
    // required: true,  // Add required flag if necessary
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  phone: {
    type: String,
    // required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
  isPhoneVerified: {
    type: Boolean,
    // default: false,
  },
  address: {
    street: {
      type: String,
      // required: true,
    },
    city: {
      type: String,
      // required: true,
    },
  },
  favoriteFlavors: {
    type: [String],
    default: [],
  },
  paymentMethods: [
    {
      type: {
        type: String,
        enum: ['MTN Mobile Money', 'Credit Card'],  // Restricting the allowed payment types
        required: true,
      },
      details: {
        phoneNumber: { type: String },  // Only allowing phoneNumber for 'MTN Mobile Money'
      },
      default: { type: Boolean, default: false },  // Default can be false initially
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to hash password
customerSchema.pre("save", async function (next) {
  this.updatedAt = new Date();

  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  // Hash password using Bun
  const _hash = await Bun.password.hash(this.password ?? "");

  // Replace password with hashed password
  this.password = _hash;
  return next();
});

export default model<ICustomer>('Customer', customerSchema);
