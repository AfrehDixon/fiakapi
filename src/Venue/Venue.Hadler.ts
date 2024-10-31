
import { Context } from 'elysia';
import Venue from './Venue.db'; 
import mongoose, { Types } from 'mongoose';
import Product from '../Item/Product.db';


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

// export const getVenueByCategoryId = async ({ params }: any) => {
//   try {
//     const categoryId = params.venueId; // rename this param in your routes to categoryId

//     // Validate if it's a valid ObjectId
//     if (!Types.ObjectId.isValid(categoryId)) {
//       return {
//         status: 400,
//         message: 'Invalid category ID format'
//       };
//     }

//     // Find venue that has the category with the given ID
//     const venue = await Venue.findOne({
//       'categories._id': new Types.ObjectId(categoryId)
//     });

//     if (!venue) {
//       return {
//         status: 404,
//         message: 'No venue found with this category'
//       };
//     }

//     // Find the specific category in the venue
//     const category = venue.categories.find(
//       cat => cat._id && cat._id.toString() === categoryId
//     );

//     // Find all products that belong to this category
//     const products = await Product.find({
//       CategoryId: new Types.ObjectId(categoryId)
//     });

//     return {
//       status: 200,
//       message: 'Venue, category, and products retrieved successfully',
//       data: {
//         venue: {
//           _id: venue._id,
//           name: venue.name,
//           address: venue.address
//         },
//         category: {
//           _id: category?._id,
//           name: category?.name,
//           products: products
//         }
//       }
//     };

//   } catch (error) {
//     console.error('Error in getVenueByCategoryId:', error);
//     return {
//       status: 500,
//       message: 'Error retrieving venue and products',
//       error: error instanceof Error ? error.message : 'Unknown error occurred'
//     };
//   }
// };



export const getAllVenues = async () => {
  try {
    const venues = await Venue.find();
    return { message: 'Venues retrieved successfully', venues };
  } catch (error) {
    return { error: (error as Error).message };
  }
};


export const getVenueById = async ({ params }: any) => {
  const id = params.venueId;
  try {
    const venue = await Venue.findById(id);
    if (!venue) {
      return { error: 'Venue not found' };
    }

    console.log(venue)
    // }
    return { message: 'Venue retrieved successfully', venue };
  } catch (error) {
    return { error: (error as Error).message };
  }
};


export const updateVenue = async (id: string, data: any) => {
  try {
    const venue = await Venue.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!venue) {
      return { error: 'Venue not found' };
    }
    return { message: 'Venue updated successfully', venue };
  } catch (error) {
    return { error: (error as Error).message };
  }
};


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

export const deleteAllVenues = async () => {
  try {
    await Venue.deleteMany();
    return { message: 'All venues deleted successfully' };
  } catch (error) {
    return { error: (error as Error).message };
  }
}



export const addCategoryToVenue = async ({ params, body }: Context) => {
  const { venueId } = params;
  const { name } = body as { name: string };

  if (!name) {
    return { success: false, message: "Category name is required." };
  }

  try {
    const venue = await Venue.findById(venueId);
    if (!venue) {
      return { success: false, message: "Venue not found." };
    }

      const newCategory = {
      _id: new mongoose.Types.ObjectId(),
      name,
      items: []
      };
    
    await venue.categories.push(newCategory);
    await venue.save();


    // const categoryExists = venue.categories.find(category => category.name === name);
    // if (categoryExists) {
    //   return { success: false, message: "Category already exists." };
    // }

    venue.categories.push({
      name, items: [],
      _id: undefined
    }); 
    await venue.save();

    return { success: true, message: "Category added successfully.", category: { _id: newCategory._id , name: newCategory.name} };
  } catch (error: any) {
    return { success: false, message: (error as Error).message };
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



export const addProductToCategory = async ({ params, body }: Context) => {
  const { categoryId } = params;
  const { name, description, venueId, sizes } = body as { name: string; description: string; venueId: string; sizes: any };

  // Validate the IDs
  if (!Types.ObjectId.isValid(categoryId) || !Types.ObjectId.isValid(venueId)) {
    return { success: false, message: 'Invalid category ID or venue ID.' };
  }

  try {
    // Find the venue containing the specified category
    const venue = await Venue.findOne({ 'categories._id': categoryId });
    if (!venue) {
      return { success: false, message: "Venue not found." };
    }

    // Locate the category within the venue's categories
    const category = venue.categories.find(cat => cat._id && cat._id.toString() === categoryId);
    
    // Check if the category was found
    if (!category) {
      return { success: false, message: "Category not found within venue." };
    }

    // Create the new product
    const newItem = await Product.create({
      name,
      description,
      CategoryId: category._id, // Use the category _id
      venueId,
      sizes,
    });

    // Add the new item ID to the category's items array
    category.items.push(newItem._id); // Assuming you want to keep track of the items in the category

    // Save the updated venue document
    await venue.save();

    return { 
      success: true, 
      message: "Product added to category successfully.", 
      data: newItem 
    };
    
  } catch (error) {
    console.error("Error in addProductToCategory:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
};