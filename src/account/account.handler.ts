import Account from "./account.db";
import { Context } from "elysia";
// Adding account to a customer
const addAccount = async ({ body }: Context) => {
    try {
        const { userId, networkType, number } = body as any;


        const newaccount = {userId,networkType,number}
        
        
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
		const accounts = await Account.find({ userId }).sort({ createdAt: 1 });
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

const deleteAccouts = async ({ params }: any) => {
    const userId = params.userId
    try {
        const accounts = await Account.deleteMany({ userId });
        return {
            success: true,
            message: "Accounts deleted successfully",
            accounts,
        };
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error ? error.message : "An unknown error occurred",
        };
    }
}

const deleteAccount = async ({ params }: any) => {  
    const { id } = params;
    try {
        const account = await Account.findByIdAndDelete(id);
        if (!account) {
            return { error: "Account not found" };
        }
        return { message: "Account deleted successfully" };
    } catch (error) {
        return { error: error instanceof Error ? error.message : "An unknown error occurred" };
    }
}

export default { addAccount, getAccounts , deleteAccount , deleteAccouts};
