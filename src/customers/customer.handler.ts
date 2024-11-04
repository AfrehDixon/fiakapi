import * as mongoose from "mongoose";
import Customer from "./customer.db"; // Import the customer model
import { Context } from "elysia";
import jwt from 'jsonwebtoken';
// import jwt from "@elysiajs/jwt";
// import jwt from 'jsonwebtoken';

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
// const Login = async ({ body,jwt }: Context) => {
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
			const token = jwt.sign({ id: existingCustomer._id, email: existingCustomer.email }, '123456');

			const response = new Response(null, {
				headers: {
					'Set-Cookie': `auth_token=${token}; HttpOnly; Path=/;`
				}
			});
			return {
				success: true,
				message: "Customer login successful",
				customer: existingCustomer,
				token,
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
