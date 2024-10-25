// itemHandler.ts
import { Context } from "elysia";
import Product from "./Product.db";

// import ItemDb from "./Item.db";


const createItem = async ({ body }: { body: { name: string; description?: string; category: string; CategoryId: string; sizes: { name: string; price: number }[] } }) => {
  const { name, description, category, CategoryId, sizes } = body;

  if (!name || !category || !CategoryId || !sizes || !Array.isArray(sizes)) {
    return { success: false, message: "All fields are required and sizes must be an array." };
  }


  for (const size of sizes) {
    if (!size.name || !size.price) {
      return { success: false, message: "Each size option must have a name and a price." };
    }
  }

  try {
    const newItem = await Product.create({ name, description, category, CategoryId, sizes });
    return { success: true, data: newItem };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};

const getAllItems = async () => {
	try {
		const items = await Product.find();
		console.log(items)
		return { message: "All Items retrieved", items };
	} catch (error) {
		return { error: (error as Error).message };
	}
};

const getItemById = async ({ params }: any) => {
	const id = params.itemId; 
	try {
		const item = await Product.findById(id);
		console.log(item)
		if (!item) {
			return { error: "Item not found" };
		}
		return { message: "Item retrieved successfully", item };
	} catch (error) {
		return { error: (error as Error).message };
	}
};

const updateItem = async ({ params, body }: { params: { id: string }, body: { name?: string; description?: string; category?: string; venueId?: string; sizes?: { name: string; price: number }[] } }) => {
  const { id } = params;
  const { name, description, category, venueId, sizes } = body;

  try {
	  const updatedItem = await Product.findByIdAndUpdate(id, { name, description, category, venueId, sizes }, { new: true });
	  console.log(updatedItem)
    if (!updatedItem) {
      return { success: false, message: "Item not found" };
    }
	  return { success: true, data: updatedItem };
	  
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};

const deleteItem = async ({ params }: any) => {
	
	const id = params.itemId;
	try {
		const item = await Product.findByIdAndDelete(id);
		console.log(item)
		if (!item) {
			return { error: "Item not found" };
		}
		return { message: "Item deleted successfully" };
	} catch (error) {
		return { error: (error as Error).message };
	}
};

export const getItemsByVenueId = async ({ params }: any) => {
	try {
    const venueId = params.venueId; 
    
		const items = await Product.find({ venueId });
		if (!items.length) {
			return { error: "No items found for this venue" };
		}
		return { message: "Items retrieved successfully", items };
	} catch (error: any) {
		return { error: (error as Error).message };
	}
};



export default {
	createItem,
	getAllItems,
	getItemById,
	updateItem,
	deleteItem,
	getItemsByVenueId,
	// deleteAllItem,
};
