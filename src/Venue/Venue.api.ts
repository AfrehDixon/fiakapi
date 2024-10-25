// routes/venueRoutes.js
import { Elysia, t } from 'elysia';
import {
  createVenue,
  getAllVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
  deleteAllVenues,
  addCategoryToVenue,
  getVenueByCategoryId
} from './Venue.Hadler'; // Adjust the path as needed
import ItemDb from '../Item/Product.db';

const app = new Elysia({ prefix: '/api/venues' });

// Route to create a new venue
app.post('/new', createVenue, {
  body: t.Object({
    name: t.String(), // Venue name
    address: t.String(), // Venue address
    // items: t.Array(
    //   t.Object({
    //     name: t.String(), // Item name
    //     description: t.Optional(t.String()), // Item description
    //     price: t.Number(), // Item price
    //     category: t.String(), // Item category
    //   })
    // ), // List of available items
  }),
});

// Route to get all venues
app.get('/get', getAllVenues);

// Route to get a specific venue by ID
app.get('/:venueId', getVenueByCategoryId, {
  params: t.Object({
    venueId: t.String(), // Venue ID
  }),
});

// Route to update a specific venue by ID
app.put('/:venueId', updateVenue, {
  params: t.Object({
    venueId: t.String(), // Venue ID
  }),
  body: t.Object({
    name: t.Optional(t.String()), // Optional update for name
    address: t.Optional(t.String()), // Optional update for address
    items: t.Optional(
      t.Array(
        t.Object({
          name: t.String(), // Item name
          description: t.Optional(t.String()), // Item description
          price: t.Number(), // Item price
          category: t.String(), // Item category
        })
      )
    ), // Optional update for items
  }),
});

// Route to delete a specific venue by ID
app.delete('/:venueId', deleteVenue, {
  params: t.Object({
    venueId: t.String(), // Venue ID
  }),
});

app.delete('/deleteAll', deleteAllVenues);

// Endpoint to create an item with a category ID
app.post('/category/:categoryId', async ({ params, body }: { params: { categoryId: string }, body: { name: string; description?: string; venueId: string; sizes: { name: string; price: number }[] } }) => {
  const { categoryId } = params;
  const { name, description, venueId, sizes } = body;

  // Validate the request body
  if (!name || !venueId || !sizes || !Array.isArray(sizes)) {
    return { success: false, message: "All fields are required and sizes must be an array." };
  }

  // Check if all size options have name and price
  for (const size of sizes) {
    if (!size.name || !size.price) {
      return { success: false, message: "Each size option must have a name and a price." };
    }
  }

  try {
    const newItem = await ItemDb.create({ name, description, category: categoryId, venueId, sizes });
    return { success: true, data: newItem };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
});


app.post('/:venueId/categories', addCategoryToVenue, {
  params: t.Object({
    venueId: t.String(),
  }),
  body: t.Object({
    name: t.String(),
  }),
});

export default app;
