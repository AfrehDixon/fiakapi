import { Schema, model, Document } from 'mongoose';

// Define the TypeScript interface for Account
export interface IAccount extends Document {
    userId: String;
    networkType: String;
    number: Number;
}

// Create the Mongoose schema using the interface
const accountSchema = new Schema<IAccount>({
    userId: {
        type: String,
        required: true,
        
        ref: 'Customer'
    },
    networkType: {
        type: String,
        // required: true,
        // enum: ['MTN', 'TELECEL', 'AIRTELTIGO', '']
    },
    number: {
        type:String,
        required: true,
        unique: true,
    }
});

// Define and export the Mongoose model
const Account = model<IAccount>('Account', accountSchema);

export default Account;
