
import { Context } from 'elysia';
import Venue from './Venue.db'; 
import mongoose, { Types } from 'mongoose';
import Product from '../Item/Product.db';
import Category from './Category.db';




export const getAllVenues = async () => {
  try {
    const venues = await Venue.find().select('-categories')
    return { message: 'Venues retrieved successfully', venues };
  } catch (error) {
    return { error: (error as Error).message };
  }
};

const getCategoriesofVenue = async ({ params }: any) => {
  const venueId = params.venueId;

  try {
    // Find categories for the specified venue and populate products
    const categories = await Category.find({ venue: venueId })
      .populate({
        path: 'items', // This should match the field name in your Category schema that holds product IDs
        model: 'Product',
      });

    console.log('categories', categories)
    return {
      success: true,
      categories,
    };
  } catch (error) {
    console.error('Error fetching categories for venue:', error);
    return { success: false, message: 'Error fetching categories for venue' };
  }
};



export const getVenueWithCategoriesAndItems = async ({ params }: Context) => {
  const { venueId } = params;

  if (!Types.ObjectId.isValid(venueId)) {
    return { success: false, message: 'Invalid venue ID.' };
  }

  try {
    const venue = await Venue.findById(venueId).populate('categories.items');
    if (!venue) {
      return { success: false, message: 'Venue not found.' };
    }
    console.log(venue)
    return {
      message: 'Venue, category, and products retrieved successfully',
      data: { venue },
    };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'An unknown error occurred' };
  }
};




// Dashboard handles

//Adding a new venue
export const createVenue = async ({ body, set }: Context) => {
  
  const data = body as {
    name: string;
    address: string;
  };
  try {
    const venue = new Venue(data);
    await venue.save();
    return { message: 'Venue created successfully', venue };
  } catch (error: any) {
    return { error: (error as Error).message };
  }
};

//Deleting All Venues

export const deleteAllVenues = async () => {
  try {
    await Venue.deleteMany();
    return { message: 'All venues deleted successfully' , venue : null };
  } catch (error) {
    return { error: (error as Error).message };
  }
};

//Deleting a venue with the given ID



export const deleteVenue = async (id: string) => {
  try {
    const venue = await Venue.findByIdAndDelete(id);
    if (!venue) {
      return { error: 'Venue not found' };
    }
    return { message: 'Venue deleted successfully' };
  } catch (error) {
    return { error: (error as Error).message };
  }
};

const addProduct = async (req: { params: { categoryId: any; }; body: any; }) => {
	const categoryId = req.params.categoryId;
  const { name, description, sizes, loyaltyPoints, image } = req.body as any; // Expecting product details in the request body
  

	try {
		
		const newProduct = new Product({
			name,
			description,
			categoryId: categoryId, // Set the category ID to which this product belongs
			sizes,
      loyaltyPoints,
		});

		// Save the product to the database
		await newProduct.save();

		// Update the category to include the new product ID in its items array
		await Category.findByIdAndUpdate(categoryId, {
			$addToSet: { items: newProduct._id }, // Add the new product ID to the items array without duplicates
		});

		return {
			success: true,
			message: "Product added to category successfully",
			product: newProduct,
		};
	} catch (error) {
		console.error("Error adding product to category:", error);
		return { success: false, message: "Error adding product to category" };
	}
}


const addCategory = async ({body , params} : Context) => {
  const venueId = params.venueId;
  const { name } = body as { name: string }; // Expecting the category name in the request body

  try {
    // Create a new category
    const newCategory = new Category({
      name,
      venue: venueId, // Associate this category with the specified venue
    });

    console.log("newCategory", newCategory);
    // Save the new category to the database
    await newCategory.save();

    // Update the venue to include the new category ID in its categories array
    await Venue.findByIdAndUpdate(venueId, {
      $addToSet: { categories: newCategory._id }, // Add the new category ID to the categories array without duplicates
    });

    return {
      success: true,
      message: "Category added to venue successfully",
      category: newCategory,
    };
  } catch (error) {
    console.error("Error adding category to venue:", error);
    return { success: false, message: "Error adding category to venue" };
  }
}


export default {
  getCategoriesofVenue,
  addProduct,
  addCategory,
}