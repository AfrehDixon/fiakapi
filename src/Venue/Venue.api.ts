// routes/venueRoutes.js
import { Elysia, t } from "elysia";
import {
	createVenue,
	getAllVenues,
	deleteVenue,
	deleteAllVenues,
	// addCategoryToVenue,
	// getVenueByCategoryId,
	getVenueWithCategoriesAndItems,
} from "./Venue.Handler"; // Adjust the path as needed
import Handler from "./Venue.Handler"; // Adjust the path as needed
import ItemDb from "../Item/Product.db";
import Venue from "./Venue.db";
import Category from "./Category.db"; // Adjust the path as needed
import Product from "../Item/Product.db"; // Adjust the path as needed

const app = new Elysia({ prefix: "/api/venues" });


app.get("/", getAllVenues);

app.get("/:venueId", Handler.getCategoriesofVenue, {
	params: t.Object({
		venueId: t.String(),
	}),
});




// Dashboard
app.post("/new", createVenue, {
	body: t.Object({
		name: t.String(),
		address: t.String(),
	}),
});

app.delete("/deleteAll", deleteAllVenues);

app.delete("/:venueId", deleteVenue, {
	params: t.Object({
		venueId: t.String(), 
	}),
});




app.post("/:categoryId/products", Handler.addProduct, {
	params: t.Object({
		categoryId: t.String(),
	}),
});


app.post("addCategory/:venueId", Handler.addCategory, {
	params: t.Object({
		venueId: t.String(),
	}),
	body: t.Object({
		name: t.String(),
	}),
});

export default app;
