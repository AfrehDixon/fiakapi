import Account from "./account.db";
import { Context } from "elysia";
// Adding account to a customer
const addAccount = async ({ body }: Context) => {
    try {
        const { userId, networkType, number } = body as any;


        const newaccount = {userId,networkType,number}
        
        // Create a new account instance with the provided body data
        const account = new Account(newaccount);
        
        console.log(account);
        await account.save();
        
        return {
            success: true,
            message: "Account added successfully",
            account
        };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "An unknown error occurred",
        };
    }
};


// Get all accounts of a customer
const getAccounts = async ({ params }: any) => {
    const userId = params.userId
	try {
		const accounts = await Account.find({ userId });
		return {
			success: true,
			message: "Accounts retrieved successfully",
			accounts,
		};
	} catch (error) {
		return {
			success: false,
			message:
				error instanceof Error ? error.message : "An unknown error occurred",
		};
	}
};

export default { addAccount, getAccounts };
