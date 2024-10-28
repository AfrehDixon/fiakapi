import { Schema, model, Document } from 'mongoose';

// Define the feedback interface
interface IFeedback extends Document {
  name: string;
  email: string;
  feedback: string;
  createdAt: Date;
}

// Create the feedback schema
const feedbackSchema = new Schema<IFeedback>({
  // name: {
  //   type: String,
  //   required: true,
  // },
  // email: {
  //   type: String,
  //   required: true,
  //   match: /\S+@\S+\.\S+/, // Basic email validation
  // },
  feedback: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the feedback model
export default model<IFeedback>('Feedback', feedbackSchema);
