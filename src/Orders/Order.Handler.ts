// // controllers/orderController.js
// import Order from "./Order.db";
// import { Context } from "elysia";


// interface CreateOrderBody {
// 	userId: string;
// 	product: string;
// 	paymentType: string;
// 	deliveryAddress: string;
// }


// const createOrder = async ({ body, set }: Context) => {
//   try {
// 	  const { userId, product, paymentType, deliveryAddress } = body as CreateOrderBody;
	  
// 	  let totalLoyaltyPoints = 0;

//     const order = new Order({
//       userId,
//       product,
//       paymentType,
//       deliveryAddress,
//       status: "Pending",
//     });
//     const savedOrder = await order.save();
//     return {
//       success: true,
//       message: "Order created successfully",
//       data: savedOrder,
//     };
//   } catch (err: any) {
//     set.status = 500;
//     return {
//       success: false,
//       message: err instanceof Error ? err.message : "An unknown error occurred",
//     };
//   }
// };


// // Get all orders
// // const getAllOrders = async () => {
// // 	try {
// // 		const orders = await Order.find().populate("userId", "name email");
// // 		return { status: "success", data: orders };
// // 	} catch (error: any) {
// // 		return { status: "error", message: error.message };
// // 	}
// // };


// const getAllOrders = async () => {
//   try {
//     const orders = await Order.find().populate("userId", "name email");
//     return { status: "success", data: orders };
//   } catch (error: any) {
//     return { status: "error", message: error.message };
//   }
// };


// // Get orders by user ID
// const getOrdersByUser = async ({ params }: { params: { userId: string } }) => {
// 	try {
// 		const { userId } = params;
// 		const orders = await Order.find({ userId }).populate(
// 			"userId",
// 			"name email"
// 		);
// 		return { status: "success", data: orders };
// 	} catch (error: any) {
// 		return { status: "error", message: error.message };
// 	}
// };

// // Get order by ID
// const getOrderById = async ({ params }: { params: { orderId: string } }) => {
// 	try {
// 		const { orderId } = params;
// 		const order = await Order.findById(orderId).populate(
// 			"userId",
// 			"name email"
// 		);
// 		if (!order) {
// 			return { status: "error", message: "Order not found" };
// 		}
// 		return { status: "success", data: order };
// 	} catch (error: any) {
// 		return { status: "error", message: error.message };
// 	}
// };

// // Update order status
// const updateOrderStatus = async ({
// 	params,
// 	body,
// }: {
// 	params: { orderId: string };
// 	body: { status: string };
// }) => {
// 	try {
// 		const { orderId } = params;
// 		const { status } = body;
// 		const updatedOrder = await Order.findByIdAndUpdate(
// 			orderId,
// 			{ status },
// 			{ new: true }
// 		);
// 		if (!updatedOrder) {
// 			return { status: "error", message: "Order not found" };
// 		}
// 		return { status: "success", data: updatedOrder };
// 	} catch (error: any) {
// 		return { status: "error", message: error.message };
// 	}
// };

// // Delete order by ID
// const deleteOrder = async ({ params }: { params: { orderId: string } }) => {
// 	try {
// 		const { orderId } = params;
// 		const deletedOrder = await Order.findByIdAndDelete(orderId);
// 		if (!deletedOrder) {
// 			return { status: "error", message: "Order not found" };
// 		}
// 		return { status: "success", message: "Order deleted successfully" };
// 	} catch (error: any) {
// 		return { status: "error", message: error.message };
// 	}
// };

// export default {
// 	createOrder,
// 	getAllOrders,
// 	getOrdersByUser,
// 	getOrderById,
// 	updateOrderStatus,
// 	deleteOrder,
// };


import Order from "./Order.db";
import { Context } from "elysia";
import { Types } from 'mongoose';

interface CreateOrderBody {
	userId: string;
	product: {
		name: string;
		description?: string;
		price: number;
	};
	paymentType: string;
	deliveryAddress: string;
}

// Create an order
const createOrder = async ({ body, set }: Context) => {
	try {
		const { userId, product, paymentType, deliveryAddress } = body as CreateOrderBody;
		
		// Validate userId
		if (!Types.ObjectId.isValid(userId)) {
			set.status = 400;
			return {
				success: false,
				message: "Invalid user ID format",
			};
		}

		const order = new Order({
			userId,
			product,
			paymentType,
			deliveryAddress,
			status: "Pending",
		});
		const savedOrder = await order.save();
		return {
			success: true,
			message: "Order created successfully",
			data: savedOrder,
		};
	} catch (err: any) {
		set.status = 500;
		return {
			success: false,
			message: err instanceof Error ? err.message : "An unknown error occurred",
		};
	}
};

// Get all orders
const getAllOrders = async () => {
	try {
		const orders = await Order.find().populate("userId", "name email");
		return { status: "success", data: orders };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
};

// Get orders by user ID
const getOrdersByUser = async ({ params }: { params: { userId: string } }) => {
	try {
		const { userId } = params;

		// Validate userId
		if (!Types.ObjectId.isValid(userId)) {
			return { status: "error", message: "Invalid user ID format" };
		}

		const orders = await Order.find({ userId }).populate("userId", "name email");
		return { status: "success", data: orders };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
};

// Get order by ID
const getOrderById = async ({ params }: { params: { orderId: string } }) => {
	try {
		const { orderId } = params;
		const order = await Order.findById(orderId).populate("userId", "name email");
		if (!order) {
			return { status: "error", message: "Order not found" };
		}
		return { status: "success", data: order };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
};

// Update order status
const updateOrderStatus = async ({
	params,
	body,
}: {
	params: { orderId: string };
	body: { status: string };
}) => {
	try {
		const { orderId } = params;
		const { status } = body;
		const updatedOrder = await Order.findByIdAndUpdate(
			orderId,
			{ status },
			{ new: true }
		);
		if (!updatedOrder) {
			return { status: "error", message: "Order not found" };
		}
		return { status: "success", data: updatedOrder };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
};

// Delete order by ID
const deleteOrder = async ({ params }: { params: { orderId: string } }) => {
	try {
		const { orderId } = params;
		const deletedOrder = await Order.findByIdAndDelete(orderId);
		if (!deletedOrder) {
			return { status: "error", message: "Order not found" };
		}
		return { status: "success", message: "Order deleted successfully" };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
};

export default {
	createOrder,
	getAllOrders,
	getOrdersByUser,
	getOrderById,
	updateOrderStatus,
	deleteOrder,
};
