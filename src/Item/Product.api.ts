// itemApi.ts
import { Elysia, t } from 'elysia';
import Handler from './Product.Handler';
import Product from './Product.db';
import ItemDb from './Product.db';

const app = new Elysia({ prefix: '/api/items' });



app.get('/get', Handler.getAllItems);

app.get('/:itemId', Handler.getItemById, {
  params: t.Object({
    itemId: t.String(),
  }),
});

app.put('/:itemId', Handler.updateItem, {
  params: t.Object({
    itemId: t.String(),
  }),
  body: t.Object({
    name: t.Optional(t.String()),
    description: t.Optional(t.String()),
    price: t.Optional(t.Number()),
    category: t.Optional(t.String()),
  }),
});

app.delete('/:itemId', Handler.deleteItem, {
  params: t.Object({
    itemId: t.String(),
  }),
});


app.get('/venue/:venueId', Handler.getItemsByVenueId, {
  params: t.Object({
    venueId: t.String(),
  }),
});


app.post("/create", Handler.createItem, {
  
});


app.put("/update/:id", Handler.updateItem );


app.delete('/deleteAll ',  async () => {
	
	try {
		await Product.deleteMany();
		console.log('Helelo wrld')
		return { message: "All items deleted successfully" };
	} catch (error) {
		return { error: (error as Error).message };
	}
});


export default app;
