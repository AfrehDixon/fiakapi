import * as mongoose from "mongoose";
import dbCustomers from "./customer.db"; // Import the customer model
import { Context } from "elysia";

const NewCustomer = async ({ body }: Context) => {
	try {
		// Destructure required fields from the request body
		const { fullname, email, password, phoneNumber } = body as any; // Include phoneNumber

		// Check if the customer already exists
		const existingCustomer = await dbCustomers.findOne({
			email,
		});

		if (existingCustomer) {
			throw new Error("Email has already been used");
		}

		// Prepare the customer data, including payment methods
		const customerData = {
			fullname,
			email,
			password, // You should hash the password before storing it for security reasons
			paymentMethods: [
				{
					type: "MTN Mobile Money",
					details: { phoneNumber }, // Add phone number to the payment method
					default: false, // Set default to false or true based on your logic
				},
			],
		};

		// Create a new customer using the dbCustomers model
		const newCustomer = await dbCustomers.create(customerData);

		if (!newCustomer || !newCustomer._id) {
			throw new Error("Signup Error: Customer registration failed");
		}

		// Return success response
		return {
			success: true,
			message:
				"Customer Account Created Successfully. Please login to continue",
			data: newCustomer,
		};
	} catch (err) {
		// Return error response
		return {
			success: false,
			message: err instanceof Error ? err.message : "An unknown error occurred",
		};
	}
};
export const addPhoneNumber = async (userId: string, phoneNumber: string) => {
	try {
		// Find the user by ID
		const user = await dbCustomers.findById(userId);
		if (!user) {
			return { success: false, error: "User not found" };
		}

		// Create new payment method
		const newPaymentMethod: PaymentMethodData = {
			type: "MTN Mobile Money",
			details: { phoneNumber }, // Assign the phone number
			default: false, // Default to false initially
		};

		// Initialize paymentMethods array if it doesn't exist
		if (!Array.isArray(user.paymentMethods)) {
			user.paymentMethods = [];
		}

		// Add the new payment method to the array
		user.paymentMethods.push(newPaymentMethod);

		// Save the updated user document
		await user.save();

		// Return success message with updated payment methods
		return {
			success: true,
			message: "Phone number added successfully",
			paymentMethods: user.paymentMethods,
		};
	} catch (error: any) {
		return { success: false, error: error.message };
	}
};

// Define the PaymentMethodData type
interface PaymentMethodData {
	type: "MTN Mobile Money" | "Credit Card";
	details: {
		phoneNumber: string;
	};
	default: boolean;
}

export const getPhoneNumbers = async (userId: string) => {
	try {
		// Find the user by ID
		const user = await dbCustomers.findById(userId);

		if (!user) {
			return { success: false, error: "User not found" };
		}

		// Extract phone numbers from payment methods
		const phoneNumbers = user.paymentMethods
			.filter((method) => method.details.phoneNumber)
			.map((method) => ({
				type: method.type,
				phoneNumber: method.details.phoneNumber,
			}));

		return { success: true, phoneNumbers };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
};

export default { NewCustomer, addPhoneNumber, getPhoneNumbers };
