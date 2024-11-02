import { Schema, model, Document } from 'mongoose';



interface ICustomer extends Document {
  fullname: String;
  email: String;
  phoneNumber: String;
  password: String;
  isPhoneVerified: boolean;
  address: {
    street: string;
    city: string;
  };
  
}

const customerSchema = new Schema<ICustomer>({
  fullname: {
    type: String,
    required: true,  
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
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
}, {timestamps: true});


// Pre-save hook to hash password
// customerSchema.pre("save", async function (next) {
//   this.updatedAt = new Date();

//   // Only hash the password if it has been modified (or is new)
//   if (!this.isModified("password")) return next();

//   // Hash password using Bun
//   const _hash = await Bun.password.hash(this.password ?? "");

//   // Replace password with hashed password
//   this.password = _hash;
//   return next();
// });

export default model<ICustomer>('Customer', customerSchema);
