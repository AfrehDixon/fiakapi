import FeedbackModel from './Feedback.db';
import { Context } from 'elysia';

 const submitFeedback = async ({ body }: Context) => {
  try {
    const { name, email, feedback } = body as any;

    console.log('Received body:', { name, email, feedback });

 
    if (!name || !email || !feedback) {
      return {
        success: false,
        message: 'All fields (name, email, feedback) are required',
      };
    }

  
    const newFeedback = new FeedbackModel({
      name,
      email,
      feedback,
    });


    await newFeedback.save();

    return {
      success: true,
      message: 'Feedback submitted successfully!',
      newFeedback,
    };
  } catch (err) {
    console.error('Error submitting feedback:', err);

    return {
      success: false,
      message: err instanceof Error ? err.message : 'An error occurred',
    };
  }
};


 const getAllFeedback = async () => {
  try {
    const feedback = await FeedbackModel.find();
    return { success: true, message: 'All feedback retrieved', feedback };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}


export default {submitFeedback, getAllFeedback};