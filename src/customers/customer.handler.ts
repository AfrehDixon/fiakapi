import * as mongoose from "mongoose";
import Customer from "./customer.db"; // Import the customer model
import { Context } from "elysia";
import jwt from "@elysiajs/jwt";

const NewCustomer = async ({ body }: Context) => {
	try {
		const { fullname, email, password, phoneNumber } = body as any;

		const existingCustomer = await Customer.findOne({
			email,
		});

		console.log(body);
		if (existingCustomer) {
			throw new Error("Email has already been used");
		}
		const hashedPassword = await Bun.password.hash(password);
		const customerData = {
			fullname,
			email,
			password: hashedPassword,
			phoneNumber,
		};

		const newCustomer = new Customer(customerData);
		await newCustomer.save();
		console.log(newCustomer);

		return {
			success: true,
			message:
				"Customer Account Created Successfully. Please login to continue",
			newCustomer,
		};
	} catch (err) {
		return {
			success: false,
			message: err instanceof Error ? err.message : "An unknown error occurred",
		};
	}
};

const Login = async ({ body }: Context) => {
	try {
		const { email, password } = body as any;
		const existingCustomer = await Customer.findOne({ email });
		if (!existingCustomer) {
			return {
				success: false,
				message: "Email is incorrect or doesn't exist",
			};
		}

		const isMatch = await Bun.password.verify(
			new Uint8Array(Buffer.from(password)),
			new Uint8Array(Buffer.from(existingCustomer.password))
		);
		if (isMatch) {
			return {
				success: true,
				message: "Customer login successful",
				customer: existingCustomer,
			};
		} else {
			return {
				success: false,
				message: "Password or email is incorrect",
			};
		}
	} catch (err) {
		console.error("Login error:", err);
		return {
			success: false,
			message: err instanceof Error ? err.message : "An unknown error occurred",
		};
	}
};

export default { NewCustomer, Login };
